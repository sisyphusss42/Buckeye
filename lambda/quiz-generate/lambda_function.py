"""
PressPlay Academy — Quiz Generation Lambda
Calls Amazon Bedrock (Nova Pro) to generate quiz questions from course content.
Deployed behind API Gateway with Cognito authorizer.
"""

import json
import boto3
import os

# Initialize Bedrock client (uses Lambda's IAM role — no keys needed)
bedrock = boto3.client(
    service_name='bedrock-runtime',
    region_name=os.environ.get('AWS_REGION', 'us-east-1')
)

MODEL_ID = os.environ.get('BEDROCK_MODEL_ID', 'us.amazon.nova-pro-v1:0')


def generate_quiz(topic, content, num_questions=3, language='zh-TW'):
    """Call Bedrock Nova Pro to generate quiz questions from content."""

    prompt = f"""你是一個教育AI助教，專門幫助學習者鞏固知識。

根據以下課程內容，生成 {num_questions} 個選擇題。每題包含：
- 一個問題（question）
- 4 個選項（options 陣列）
- 正確答案的索引（correctIndex，0-3）
- 簡短解釋（explanation）

主題：{topic}

課程內容：
{content}

請用繁體中文（zh-TW）回答。嚴格以 JSON 格式輸出，不要包含其他文字：
{{
  "questions": [
    {{
      "question": "問題內容",
      "options": ["選項A", "選項B", "選項C", "選項D"],
      "correctIndex": 0,
      "explanation": "解釋為什麼這個答案正確"
    }}
  ]
}}"""

    body = json.dumps({
        "messages": [
            {"role": "user", "content": [{"text": prompt}]}
        ],
        "inferenceConfig": {
            "maxTokens": 2000,
            "temperature": 0.7
        }
    })

    response = bedrock.invoke_model(
        modelId=MODEL_ID,
        body=body,
        contentType='application/json',
        accept='application/json'
    )

    result = json.loads(response['body'].read())
    assistant_text = result['output']['message']['content'][0]['text']

    # Parse the JSON from Nova's response
    # Handle potential markdown code blocks
    text = assistant_text.strip()
    if text.startswith('```'):
        text = text.split('\n', 1)[1]  # remove first line
        text = text.rsplit('```', 1)[0]  # remove last ```
    
    quiz_data = json.loads(text)
    return quiz_data


def lambda_handler(event, context):
    """API Gateway Lambda handler."""
    
    # Parse request body
    try:
        if isinstance(event.get('body'), str):
            body = json.loads(event['body'])
        else:
            body = event.get('body', event)
    except (json.JSONDecodeError, TypeError):
        return response(400, {'error': '無效的請求格式'})

    topic = body.get('topic', '攝影')
    content = body.get('content', '')
    num_questions = body.get('numQuestions', 3)

    # If no content provided, use a default sample for demo
    if not content:
        content = get_demo_content(topic)

    try:
        quiz = generate_quiz(topic, content, num_questions)
        return response(200, quiz)
    except Exception as e:
        print(f"Error generating quiz: {str(e)}")
        return response(500, {'error': '生成測驗失敗', 'detail': str(e)})


def response(status_code, body):
    """Format API Gateway response with CORS headers."""
    return {
        'statusCode': status_code,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Headers': 'Content-Type,Authorization',
            'Access-Control-Allow-Methods': 'POST,OPTIONS',
        },
        'body': json.dumps(body, ensure_ascii=False)
    }


def get_demo_content(topic):
    """Demo content for hackathon — replace with Knowledge Base retrieval in production."""
    
    demos = {
        '攝影': """
        三分法則（Rule of Thirds）是攝影構圖的基本原則之一。
        將畫面分成九宮格（3x3），主體放在交叉點上，比置中更自然生動。
        這個技巧來自於人眼自然觀看圖像的方式。
        
        白平衡（White Balance）是指在不同光源下，讓白色物體看起來仍然是白色的設定。
        不同的光源有不同的色溫：日光約5500K，鎢絲燈約3200K，陰影約7000K。
        
        光圈（Aperture）控制進入鏡頭的光量，用f值表示。
        f值越小（如f/1.8），光圈越大，景深越淺（背景模糊）。
        f值越大（如f/16），光圈越小，景深越深（全部清晰）。
        """,
        '心理學': """
        認知偏誤（Cognitive Bias）是人類思考時的系統性偏差。
        確認偏誤（Confirmation Bias）：傾向尋找支持已有信念的資訊。
        從眾效應（Bandwagon Effect）：因為其他人做某事，所以跟著做。
        錨定效應（Anchoring Effect）：過度依賴第一個接收到的資訊做判斷。
        
        馬斯洛需求層次理論將人類需求分為五層：
        1. 生理需求 2. 安全需求 3. 社會需求 4. 尊重需求 5. 自我實現
        """,
        '理財': """
        複利效應是投資最重要的概念之一。
        假設年報酬率10%，100萬元經過10年會變成約259萬元。
        72法則：用72除以年報酬率，就能大略知道本金翻倍所需年數。
        
        資產配置（Asset Allocation）是分散風險的核心策略。
        常見配置：股票（成長）、債券（穩定）、現金（流動性）。
        年輕人可以承受較高風險，配置較多股票；年長者則偏向債券。
        """,
    }
    
    return demos.get(topic, demos['攝影'])
