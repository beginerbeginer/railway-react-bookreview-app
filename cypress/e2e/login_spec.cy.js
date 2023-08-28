describe('Login Page', () => {
  beforeEach(() => {
    // アプリケーションのトップページを訪れる
    cy.visit('/signin')
  })

  it('shows error message if email or password is missing', () => {
    // Emailのみを入力してLoginボタンをクリック
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('button').click()

    // エラーメッセージが表示されることを確認
    cy.get('.error-message').should('contain', 'Email and Password are required!')

    // Passwordのみを入力してLoginボタンをクリック
    cy.get('input[type="email"]').clear()
    cy.get('input[type="password"]').type('password')
    cy.get('button').click()

    // エラーメッセージが表示されることを確認
    cy.get('.error-message').should('contain', 'Email and Password are required!')
  })

  it('does not show error message if both email and password are provided', () => {
    // EmailとPasswordを入力してLoginボタンをクリック
    cy.get('input[type="email"]').type('test@example.com')
    cy.get('input[type="password"]').type('password')
    cy.get('button').click()

    // エラーメッセージが表示されないことを確認
    cy.get('.error-message').should('not.exist')
  })
})
