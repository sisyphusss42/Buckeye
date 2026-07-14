// AWS Configuration
const config = {
  cognito: {
    region: 'us-east-1',
    userPoolId: 'us-east-1_d4CpmgplF',
    clientId: '4qu0ro6hpihv9e9lgc11vubh4u',
  },
  api: {
    baseUrl: 'YOUR_API_GATEWAY_URL', // e.g. https://xxxxx.execute-api.us-east-1.amazonaws.com/prod
  },
}

export default config
