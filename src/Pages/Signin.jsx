import { useState } from 'react'

import { URL } from '../const'
import '../scss/signin.scss'

export const Signin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async () => {
    if (!email || !password) {
      setErrorMessage('emailとPasswordは必須です!')
      return
    }

    try {
      const response = await fetch(`${URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        setErrorMessage('')
      } else if (response.status >= 400 && response.status < 500) {
        const errorData = await response.json()
        setErrorMessage(errorData.ErrorMessageJP)
      }
    } catch (error) {
      setErrorMessage('エラーが発生しました。もう一度お試しください。')
    }
  }

  return (
    <div className="signin">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSubmit}>Login</button>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  )
}
