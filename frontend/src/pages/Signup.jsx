import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
function Signup() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Replace with API call
    // eslint-disable-next-line no-console
    axios.post('http://localhost:8000/auth/signup/', { username, password })
      .then(response => {
        console.log('Signup successful', response.data)
        navigate('/home')
      })
      .catch(error => {
        console.error('Signup failed', error)
      })
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Start building your standout resume</p>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label className="auth-label" htmlFor="username">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="auth-input"
            placeholder="yourname"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <label className="auth-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="auth-input"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Create account
          </button>
        </form>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  )
}

export default Signup


