import { useReducer } from 'react'

import { URL } from '../const'
import '../scss/signin.scss'

const initialState = {
  email: '',
  password: '',
  errorMessage: '',
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_EMAIL':
      return { ...state, email: action.payload }
    case 'SET_PASSWORD':
      return { ...state, password: action.payload }
    case 'SET_ERROR_MESSAGE':
      return { ...state, errorMessage: action.payload }
    default:
      throw new Error('Unknown action type')
  }
}

export const Signin = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleSubmit = async () => {
    try {
      const response = await fetch(`${URL}/signin`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: state.email, password: state.password }),
      })

      if (response.ok) {
        const data = await response.json()
        localStorage.setItem('token', data.token)
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: '' })
      } else if (response.status >= 400 && response.status < 500) {
        const errorData = await response.json()
        dispatch({ type: 'SET_ERROR_MESSAGE', payload: errorData.ErrorMessageJP })
      }
    } catch (error) {
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: 'エラーが発生しました。もう一度お試しください。' })
    }
  }

  return (
    <div className="signin">
      <input
        type="email"
        placeholder="Email"
        value={state.email}
        onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={state.password}
        onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
      />
      <button onClick={handleSubmit}>Login</button>
      {state.errorMessage && <p className="error-message">{state.errorMessage}</p>}
    </div>
  )
}
