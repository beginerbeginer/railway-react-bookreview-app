import { useMutation } from '@tanstack/react-query'
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

const postLoginRequest = async (email, password) => {
  const response = await fetch(`${URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (response.ok) {
    return response.json()
  } else {
    const errorData = await response.json()
    throw new Error(errorData.ErrorMessageJP)
  }
}

export const Signin = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const mutation = useMutation(() => postLoginRequest(state.email, state.password), {
    onSuccess: (data) => {
      localStorage.setItem('token', data.token)
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: '' })
    },
    onError: (error) => {
      dispatch({ type: 'SET_ERROR_MESSAGE', payload: error.message })
    },
  })

  const handleSubmit = () => {
    mutation.mutate()
  }

  return (
    <form className="signin">
      <input
        type="email"
        placeholder="Email"
        value={state.email}
        autoComplete="username"
        onChange={(e) => dispatch({ type: 'SET_EMAIL', payload: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        value={state.password}
        autoComplete="current-password"
        onChange={(e) => dispatch({ type: 'SET_PASSWORD', payload: e.target.value })}
      />
      <button onClick={handleSubmit}>Login</button>
      {state.errorMessage && <p className="error-message">{state.errorMessage}</p>}
    </form>
  )
}
