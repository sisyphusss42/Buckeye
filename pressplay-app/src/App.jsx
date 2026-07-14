import { Routes, Route } from 'react-router-dom'
import Splash from './screens/Splash'
import Survey from './screens/Survey'
import Home from './screens/Home'
import Video from './screens/Video'
import Quiz from './screens/Quiz'
import Garden from './screens/Garden'
import FlowerDetail from './screens/FlowerDetail'
import Review from './screens/Review'
import Partners from './screens/Partners'
import Chat from './screens/Chat'
import Profile from './screens/Profile'
import Wrap from './screens/Wrap'
import Leaderboard from './screens/Leaderboard'
import Notifications from './screens/Notifications'

export default function App() {
  return (
    <div className="app-container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/splash" element={<Splash />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/video" element={<Video />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/garden" element={<Garden />} />
        <Route path="/flower" element={<FlowerDetail />} />
        <Route path="/review" element={<Review />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/wrap" element={<Wrap />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </div>
  )
}
