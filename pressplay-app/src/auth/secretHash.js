import config from '../config'

// Compute SECRET_HASH using Web Crypto API (browser-compatible)
export async function computeSecretHash(username) {
  const encoder = new TextEncoder()
  const key = await crypto.subtle.importKey(
    'raw',
    encoder.encode(config.cognito.clientSecret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  )
  const message = encoder.encode(username + config.cognito.clientId)
  const signature = await crypto.subtle.sign('HMAC', key, message)
  return btoa(String.fromCharCode(...new Uint8Array(signature)))
}
