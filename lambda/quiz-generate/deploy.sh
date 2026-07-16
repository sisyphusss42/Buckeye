#!/bin/bash
# Deploy quiz-generate Lambda to AWS
# Run from this directory: ./deploy.sh

FUNCTION_NAME="pressplay-quiz-generate"
REGION="us-east-1"
ROLE_ARN="YOUR_LAMBDA_EXECUTION_ROLE_ARN"  # Must have bedrock:InvokeModel permission

# Package
zip -j function.zip lambda_function.py

# Create or update
aws lambda create-function \
  --function-name $FUNCTION_NAME \
  --runtime python3.12 \
  --handler lambda_function.lambda_handler \
  --role $ROLE_ARN \
  --zip-file fileb://function.zip \
  --timeout 30 \
  --memory-size 256 \
  --environment "Variables={BEDROCK_MODEL_ID=us.amazon.nova-pro-v1:0}" \
  --region $REGION \
  2>/dev/null || \
aws lambda update-function-code \
  --function-name $FUNCTION_NAME \
  --zip-file fileb://function.zip \
  --region $REGION

echo "Done. Now set up API Gateway to point to this Lambda."
rm function.zip
