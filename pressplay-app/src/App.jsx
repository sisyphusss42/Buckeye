import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './auth/AuthContext'
import Splash from './screens/Splash'
import Survey from './screens/Survey'
import Home from './screens/Home'
import Course from './screens/Course'
import Video from './screens/Video'
import Quiz from './screens/Quiz'
import Garden from './screens/Garden'
import FlowerDetail from './screens/FlowerDetail'
import Review from './screens/Review'
import ReviewSession from './screens/ReviewSession'
import Partners from './screens/Partners'
import Chat from './screens/Chat'
import Profile from './screens/Profile'
import Wrap from './screens/Wrap'
import Leaderboard from './screens/Leaderboard'
import Notifications from './screens/Notifications'
import Login from './screens/Login'

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/splash" replace />
  return children
}

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/splash" element={<Splash />} />
        <Route path="/login" element={<Login />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/course/:courseId" element={<ProtectedRoute><Course /></ProtectedRoute>} />
        <Route path="/video/:videoId" element={<ProtectedRoute><Video /></ProtectedRoute>} />
        <Route path="/quiz/:videoId" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/garden" element={<ProtectedRoute><Garden /></ProtectedRoute>} />
        <Route path="/flower/:videoId" element={<ProtectedRoute><FlowerDetail /></ProtectedRoute>} />
        <Route path="/review" element={<ProtectedRoute><Review /></ProtectedRoute>} />
        <Route path="/review-session" element={<ProtectedRoute><ReviewSession /></ProtectedRoute>} />
        <Route path="/partners" element={<ProtectedRoute><Partners /></ProtectedRoute>} />
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/wrap" element={<ProtectedRoute><Wrap /></ProtectedRoute>} />
        <Route path="/leaderboard" element={<ProtectedRoute><Leaderboard /></ProtectedRoute>} />
        <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}
