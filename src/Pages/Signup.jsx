import { useState } from 'react'

import { URL } from '../const'
import '../scss/signup.scss'

const createUser = async (name, email, password) => {
  const response = await fetch(`${URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  })

  if (!response.ok) {
    throw new Error('User creation failed')
  }

  return response.json()
}

const uploadImage = async (file, token) => {
  console.log('Upload function called with token:', token)
  console.log('File to upload:', file)

  const formData = new FormData()
  formData.append('icon', file)

  const response = await fetch(`${URL}/uploads`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  })

  if (!response.ok) {
    throw new Error('Image upload failed')
  }

  console.log('Server response:', response)
  console.log('Server response status:', response.status)

  return response.json()
}

export const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [file, setFile] = useState(null)
  const [debugToken, setDebugToken] = useState('') // <-- Add this state

  const handleSignup = async () => {
    try {
      const userResponse = await createUser(name, email, password)
      localStorage.setItem('token', userResponse.token)
      setDebugToken(userResponse.token) // <-- Set the token to the state

      // トークン取得後に画像をアップロードする
      if (file) {
        await uploadImage(file, userResponse.token)
      }
    } catch (error) {
      console.error(error)
      setErrors((prev) => [...prev, '登録中にエラーが発生しました。'])
    }
  }

  return (
    <div className="signup">
      <input type="file" aria-label="画像を追加" onChange={(e) => setFile(e.target.files[0])} />
      <input type="text" placeholder="名前" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>登録</button>
      {debugToken && <div className="debug-token">Token: {debugToken}</div>}
      {errors.map((error, index) => (
        <div key={index} className="error">
          {error}
        </div>
      ))}
      <div className="login-link">
        既にアカウントをお持ちですか？<a href="/login">ログイン</a>
      </div>
    </div>
  )
}
