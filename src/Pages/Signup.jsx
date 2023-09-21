import Compressor from 'compressorjs'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import { URL as API_URL } from '../const'
import '../scss/signup.scss'

const PASSWORD_PATTERN = '/^[A-Za-z0-9!"#$%&\'()-^@[];:,./=|~+*{}<>?_]+$/'
const EMAIL_PATTERN = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i

const postUserData = async (url, body) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  return response
}

const postImage = async (url, formData, headers = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: formData,
  })
  return response
}

const createUser = async (name, email, password) => {
  const response = await postUserData(`${API_URL}/users`, { name, email, password })
  return response.json()
}

const uploadImage = async (file, token) => {
  const formData = new FormData()
  formData.append('icon', file)
  const response = await postImage(`${API_URL}/uploads`, formData, {
    Authorization: `Bearer ${token}`,
  })
  return response.json()
}

export const Signup = () => {
  const [file, setFile] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [resizedImageBlob, setResizedImageBlob] = useState(null)
  const [inputKey, setInputKey] = useState(Date.now())
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (selectedFile) {
      // eslint-disable-next-line no-new
      new Compressor(selectedFile, {
        quality: 0.6, // 60%の画質で圧縮する
        success(result) {
          setResizedImageBlob(result)
          setShowModal(true)
        },
        error(err) {
          console.error('Compressor error:', err)
        },
      })
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setResizedImageBlob(null)
    setFile(null)
    // 画像の名前をリセットするため
    setInputKey(Date.now())
  }

  const onSubmit = async (data) => {
    try {
      const userResponse = await createUser(data.name, data.email, data.password)
      localStorage.setItem('token', userResponse.token)
      if (file) {
        await uploadImage(file, userResponse.token)
      }
      closeModal()
      reset({ name: '', email: '', password: '' })
    } catch (error) {
      console.error(error)
    }
  }

  const Modal = ({ resizedImageBlob, closeModal }) => {
    return (
      <div className="modal">
        <img src={URL.createObjectURL(resizedImageBlob)} alt="Resized Preview" />
        <button onClick={closeModal}>画像を削除</button>
      </div>
    )
  }

  Modal.propTypes = {
    resizedImageBlob: PropTypes.instanceOf(Blob).isRequired,
    closeModal: PropTypes.func.isRequired,
  }

  return (
    <div className="signup">
      {showModal ? <Modal resizedImageBlob={resizedImageBlob} closeModal={closeModal} /> : null}
      <input key={inputKey} type="file" aria-label="画像を追加" onChange={handleFileChange} />
      <input type="text" placeholder="名前" {...register('name', { required: '名前は必須です。' })} />
      <input
        type="text"
        placeholder="Email"
        {...register('email', {
          required: 'メールアドレスは必須です。',
          pattern: {
            value: EMAIL_PATTERN,
            message: '無効なメールアドレスの形式です。',
          },
        })}
      />

      <input
        type="password"
        placeholder="Password"
        {...register('password', {
          required: 'パスワードは必須です。',
          minLength: { value: 12, message: 'パスワードは12文字以上である必要があります。' },
          pattern: {
            value: PASSWORD_PATTERN,
            message: 'パスワードには、半角英数字記号のみ使用できます。',
          },
        })}
      />
      {errors.name && <div className="error">{errors.name.message}</div>}
      {errors.email && <div className="error">{errors.email.message}</div>}
      {errors.password && <div className="error">{errors.password.message}</div>}

      <button onClick={handleSubmit(onSubmit)}>登録</button>
      <div className="login-link">
        既にアカウントをお持ちですか？<a href="/login">ログイン</a>
      </div>
    </div>
  )
}
