import { createContext, useContext, useState, useEffect } from 'react'
import config from '../config'
import { computeSecretHash } from './secretHash'

const COGNITO_URL = `https://cognito-idp.${config.cognito.region}.amazonaws.com/`

// Direct Cognito API call
async function cognitoRequest(action, params) {
  const res = await fetch(COGNITO_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-amz-json-1.1',
      'X-Amz-Target': `AWSCognitoIdentityProviderService.${action}`,
    },
    body: JSON.stringify(params),
  })
  const data = await res.json()
  if (!res.ok) {
    throw new Error(data.message || data.__type || 'Cognito request failed')
  }
  return data
}

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [tokens, setTokens] = useState(null)

  // Check localStorage for existing session
  useEffect(() => {
    const stored = localStorage.getItem('pressplay_auth')
    if (stored) {
      try {
        const parsed = JSON.parse(stored)
        setUser({ username: parsed.username, token: parsed.idToken })
        setTokens(parsed)
      } catch (e) { /* ignore */ }
    }
    setLoading(false)
  }, [])

  // Sign up
  const signUp = async (email, password, displayName) => {
    const hash = await computeSecretHash(email)
    const params = {
      ClientId: config.cognito.clientId,
      SecretHash: hash,
      Username: email,
      Password: password,
      UserAttributes: [
        { Name: 'email', Value: email },
      ],
    }
    if (displayName) {
      params.UserAttributes.push({ Name: 'nickname', Value: displayName })
    }
    return await cognitoRequest('SignUp', params)
  }

  // Confirm sign up
  const confirmSignUp = async (email, code) => {
    const hash = await computeSecretHash(email)
    return await cognitoRequest('ConfirmSignUp', {
      ClientId: config.cognito.clientId,
      SecretHash: hash,
      Username: email,
      ConfirmationCode: code,
    })
  }

  // Sign in (USER_PASSWORD_AUTH flow — simpler than SRP)
  const signIn = async (email, password) => {
    const hash = await computeSecretHash(email)
    const data = await cognitoRequest('InitiateAuth', {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: config.cognito.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
        SECRET_HASH: hash,
      },
    })

    const result = data.AuthenticationResult
    const authData = {
      username: email,
      idToken: result.IdToken,
      accessToken: result.AccessToken,
      refreshToken: result.RefreshToken,
    }
    localStorage.setItem('pressplay_auth', JSON.stringify(authData))
    setUser({ username: email, token: result.IdToken })
    setTokens(authData)
    return authData
  }

  // Sign out
  const signOut = () => {
    localStorage.removeItem('pressplay_auth')
    setUser(null)
    setTokens(null)
  }

  // Demo mode
  const demoLogin = () => {
    setUser({ username: 'Ava', token: 'demo-token' })
  }

  // Get current token
  const getToken = () => {
    if (user?.token === 'demo-token') return Promise.resolve('demo-token')
    if (tokens?.idToken) return Promise.resolve(tokens.idToken)
    return Promise.reject(new Error('No token'))
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, confirmSignUp, signIn, signOut, demoLogin, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
