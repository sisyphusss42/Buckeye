"""
PressPlay Academy — Get Video Pre-signed URL Lambda
Generates a time-limited S3 pre-signed URL so the frontend can stream
the video without making the bucket public.
"""

import json
import boto3
from botocore.config import Config
import os

# Don't set endpoint_url — let boto3 resolve it naturally
s3 = boto3.client(
    's3',
    region_name='us-east-1',
    config=Config(signature_version='s3v4')
)

BUCKET_NAME = os.environ.get('S3_BUCKET', 'hackathon-968750300657-us-east-1-an')
URL_EXPIRATION = int(os.environ.get('URL_EXPIRATION', '3600'))  # 1 hour default


def lambda_handler(event, context):
    """Generate a pre-signed URL for a video in S3."""

    try:
        if isinstance(event.get('body'), str):
            body = json.loads(event['body'])
        else:
            body = event.get('body', event)
    except (json.JSONDecodeError, TypeError):
        return response(400, {'error': '無效的請求格式'})

    video_key = body.get('videoKey', '一元一次方程式解速率問題 (720 X 1280).mp4')

    # Debug: verify Lambda can actually read the file
    try:
        head = s3.head_object(Bucket=BUCKET_NAME, Key=video_key)
        print(f"✅ File found! Size: {head['ContentLength']}, Type: {head.get('ContentType')}")
    except Exception as e:
        print(f"❌ Cannot access file: {str(e)}")
        return response(403, {'error': f'Lambda cannot access file: {str(e)}'})

    try:
        presigned_url = s3.generate_presigned_url(
            'get_object',
            Params={
                'Bucket': BUCKET_NAME,
                'Key': video_key,
            },
            ExpiresIn=URL_EXPIRATION
        )
        print(f"Generated URL host: {presigned_url.split('?')[0]}")
        return response(200, {'url': presigned_url, 'expiresIn': URL_EXPIRATION})
    except Exception as e:
        print(f"Error generating presigned URL: {str(e)}")
        return response(500, {'error': '無法產生影片連結', 'detail': str(e)})


def response(status_code, body):
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
