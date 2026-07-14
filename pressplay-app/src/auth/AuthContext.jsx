import { createContext, useContext, useState, useEffect } from 'react'
import { CognitoUserPool, CognitoUser, AuthenticationDetails, CognitoUserAttribute } from 'amazon-cognito-identity-js'
import config from '../config'

const userPool = new CognitoUserPool({
  UserPoolId: config.cognito.userPoolId,
  ClientId: config.cognito.clientId,
})

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  // Check for existing session on mount
  useEffect(() => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) {
      cognitoUser.getSession((err, session) => {
        if (err) {
          setLoading(false)
          return
        }
        if (session.isValid()) {
          setUser({
            username: cognitoUser.getUsername(),
            token: session.getIdToken().getJwtToken(),
          })
        }
        setLoading(false)
      })
    } else {
      setLoading(false)
    }
  }, [])

  // Sign up
  const signUp = (email, password, displayName) => {
    return new Promise((resolve, reject) => {
      const attributes = [
        new CognitoUserAttribute({ Name: 'email', Value: email }),
      ]
      if (displayName) {
        attributes.push(new CognitoUserAttribute({ Name: 'nickname', Value: displayName }))
      }
      userPool.signUp(email, password, attributes, null, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  }

  // Confirm sign up (verification code)
  const confirmSignUp = (email, code) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({ Username: email, Pool: userPool })
      cognitoUser.confirmRegistration(code, true, (err, result) => {
        if (err) return reject(err)
        resolve(result)
      })
    })
  }

  // Sign in
  const signIn = (email, password) => {
    return new Promise((resolve, reject) => {
      const cognitoUser = new CognitoUser({ Username: email, Pool: userPool })
      const authDetails = new AuthenticationDetails({ Username: email, Password: password })

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session) => {
          const userData = {
            username: cognitoUser.getUsername(),
            token: session.getIdToken().getJwtToken(),
          }
          setUser(userData)
          resolve(userData)
        },
        onFailure: (err) => reject(err),
      })
    })
  }

  // Sign out
  const signOut = () => {
    const cognitoUser = userPool.getCurrentUser()
    if (cognitoUser) cognitoUser.signOut()
    setUser(null)
  }

  // Get current token (refreshes if needed)
  const getToken = () => {
    return new Promise((resolve, reject) => {
      const cognitoUser = userPool.getCurrentUser()
      if (!cognitoUser) return reject(new Error('No user'))
      cognitoUser.getSession((err, session) => {
        if (err) return reject(err)
        resolve(session.getIdToken().getJwtToken())
      })
    })
  }

  return (
    <AuthContext.Provider value={{ user, loading, signUp, confirmSignUp, signIn, signOut, getToken }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used within AuthProvider')
  return context
}
