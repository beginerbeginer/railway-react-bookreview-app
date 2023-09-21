import { render, screen } from '@testing-library/react'

import { Signup } from '../Pages/Signup.jsx'

describe('Signup', () => {
  it('ログイン画面に必要なコンポーネントが存在する', () => {
    render(<Signup />)

    // 入力フォームが存在するか確認
    expect(screen.getByPlaceholderText('名前')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()

    // ボタンが存在するか確認
    expect(screen.getByText('登録')).toBeInTheDocument()

    expect(screen.getByLabelText('画像を追加')).toBeInTheDocument()
  })
})
