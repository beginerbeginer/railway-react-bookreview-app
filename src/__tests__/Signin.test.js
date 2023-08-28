import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'

import { Signin } from '../Pages/Signin.jsx'
const queryClient = new QueryClient()

describe('Signin', () => {
  it('ログイン画面に必要なコンポーネントが存在する', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Signin />
      </QueryClientProvider>
    )

    // 入力フォームが存在するか確認
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()

    // ボタンが存在するか確認
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
})
