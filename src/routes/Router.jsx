import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

import { Signin } from '../Pages/Signin.jsx'

export const AppRouter = () => {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Signin />
          <Routes>
            <Route path="/login" element={<Signin />} />
            <Route path="/" element={<Navigate to="/signin" />} />
          </Routes>
        </header>
      </div>
    </Router>
  )
}
