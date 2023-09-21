import Compressor from 'compressorjs'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { URL as API_URL } from '../const'
import '../scss/signup.scss'

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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState([])
  const [file, setFile] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [resizedImageBlob, setResizedImageBlob] = useState(null)
  const [inputKey, setInputKey] = useState(Date.now())

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

  const handleSignup = async () => {
    try {
      const userResponse = await createUser(name, email, password)
      localStorage.setItem('token', userResponse.token)
      if (file) {
        await uploadImage(file, userResponse.token)
      }
    } catch (error) {
      console.error(error)
      setErrors((prev) => [...prev, '登録中にエラーが発生しました。'])
    }
    closeModal()
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
      <input type="text" placeholder="名前" onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignup}>登録</button>
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
