import { BrowserRouter as Router, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'

import { Signin } from '../Pages/Signin.jsx'
import { Signup } from '../Pages/Signup.jsx'

export const AppRouter = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <RoutesWithLinks />
        </header>
      </div>
    </Router>
  )
}

const RoutesWithLinks = () => {
  // 現在のルート（URL）を取得する
  const location = useLocation()

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
      {location.pathname === '/login' && <Link to="/signup">登録はこちらから</Link>}
    </>
  )
}
