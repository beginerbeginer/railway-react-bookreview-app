import '../scss/signup.scss'

export const Signup = () => {
  return (
    <div className="signup">
      <div data-testid="image-preview"></div>
      <input type="file" aria-label="画像を追加" />
      <input type="text" placeholder="名前" />
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>登録</button>
    </div>
  )
}
