import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { signIn, signUp, confirmSignUp } = useAuth()
  const [mode, setMode] = useState('login') // login | signup | confirm
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || '登入失敗')
    }
    setLoading(false)
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await signUp(email, password, name)
      setMode('confirm')
    } catch (err) {
      setError(err.message || '註冊失敗')
    }
    setLoading(false)
  }

  const handleConfirm = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await confirmSignUp(email, code)
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      setError(err.message || '驗證失敗')
    }
    setLoading(false)
  }

  return (
    <div className="screen" style={{ background: 'linear-gradient(180deg,#E8F5E9 0%,var(--bg) 100%)' }}>
      <div className="screen-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ fontSize: 56, marginBottom: 16 }}>🌿</div>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: 'var(--green)', marginBottom: 4 }}>PressPlay Academy</h1>
        <p className="text-caption" style={{ marginBottom: 32 }}>用學習灌溉你的知識花園</p>

        {mode === 'confirm' ? (
          <form onSubmit={handleConfirm} style={{ width: '100%', maxWidth: 300 }}>
            <p className="text-body mb-16" style={{ textAlign: 'center' }}>我們已寄送驗證碼到你的信箱</p>
            <input
              type="text"
              placeholder="驗證碼"
              value={code}
              onChange={e => setCode(e.target.value)}
              style={inputStyle}
            />
            {error && <p style={errorStyle}>{error}</p>}
            <button className="btn btn-primary mt-16" type="submit" disabled={loading}>
              {loading ? '驗證中...' : '確認驗證'}
            </button>
          </form>
        ) : (
          <form onSubmit={mode === 'login' ? handleLogin : handleSignUp} style={{ width: '100%', maxWidth: 300 }}>
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="顯示名稱"
                value={name}
                onChange={e => setName(e.target.value)}
                style={inputStyle}
              />
            )}
            <input
              type="email"
              placeholder="電子信箱"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={inputStyle}
            />
            <input
              type="password"
              placeholder="密碼"
              value={password}
              onChange={e => setPassword(e.target.value)}
              style={inputStyle}
            />
            {error && <p style={errorStyle}>{error}</p>}
            <button className="btn btn-primary mt-16" type="submit" disabled={loading}>
              {loading ? '處理中...' : mode === 'login' ? '登入' : '註冊'}
            </button>
            <button
              type="button"
              className="btn btn-ghost mt-8"
              onClick={() => { setMode(mode === 'login' ? 'signup' : 'login'); setError('') }}
            >
              {mode === 'login' ? '還沒有帳號？註冊' : '已經有帳號？登入'}
            </button>
          </form>
        )}

        {/* Skip auth for demo */}
        <button
          className="btn btn-ghost mt-24"
          onClick={() => navigate('/')}
          style={{ fontSize: 13, color: 'var(--text-tertiary)' }}
        >
          跳過登入（Demo 模式）
        </button>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1.5px solid var(--gray-200)',
  borderRadius: 'var(--r-full)',
  fontSize: 15,
  fontFamily: 'var(--font)',
  outline: 'none',
  marginBottom: 12,
}

const errorStyle = {
  fontSize: 13,
  color: 'var(--danger)',
  textAlign: 'center',
  marginTop: 4,
}
