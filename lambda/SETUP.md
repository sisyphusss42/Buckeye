# Lambda + API Gateway Setup Guide

## Quick Setup (AWS Console)

### Step 1: Create the Lambda Function

1. Go to **AWS Lambda** console (us-east-1)
2. Create function → Author from scratch
3. Settings:
   - Name: `pressplay-quiz-generate`
   - Runtime: Python 3.12
   - Architecture: x86_64
   - Execution role: Use existing role (one with Bedrock access)
4. Copy-paste the code from `quiz-generate/lambda_function.py`
5. Configuration → General: Set timeout to **30 seconds**
6. Configuration → Environment variables:
   - `BEDROCK_MODEL_ID` = `us.amazon.nova-pro-v1:0`

### Step 2: IAM Role Permissions

Your Lambda's execution role needs this policy:
```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": "bedrock:InvokeModel",
      "Resource": "arn:aws:bedrock:us-east-1::foundation-model/*"
    }
  ]
}
```

### Step 3: Create API Gateway

1. Go to **API Gateway** console
2. Create API → **HTTP API** (simpler, cheaper)
3. Add integration: Lambda → select `pressplay-quiz-generate`
4. Routes:
   - `POST /quiz/generate` → pressplay-quiz-generate
   - `OPTIONS /quiz/generate` → (auto-handled by CORS config)
5. Configure CORS:
   - Allow origins: `*`
   - Allow methods: `POST, OPTIONS`
   - Allow headers: `Content-Type, Authorization`
6. Deploy → copy the Invoke URL

### Step 4: (Optional) Add Cognito Authorizer

1. In API Gateway → Authorization
2. Create authorizer → JWT
3. Issuer URL: `https://cognito-idp.us-east-1.amazonaws.com/us-east-1_d4CpmgplF`
4. Audience: `4qu0ro6hpihv9e9lgc11vubh4u`
5. Attach to `POST /quiz/generate` route

### Step 5: Update Frontend Config

In `pressplay-app/src/config.js`, set:
```js
api: {
  baseUrl: 'https://XXXXXXXX.execute-api.us-east-1.amazonaws.com'
}
```

## Testing

```bash
curl -X POST https://YOUR_API_URL/quiz/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "攝影", "numQuestions": 2}'
```

Expected response:
```json
{
  "questions": [
    {
      "question": "三分法則建議將主體放在畫面的哪個位置？",
      "options": ["正中央", "九宮格交叉點", "最上方", "角落"],
      "correctIndex": 1,
      "explanation": "三分法則將畫面分成九宮格，主體放在交叉點上比置中更自然。"
    }
  ]
}
```
