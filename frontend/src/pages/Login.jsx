import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleSubmit = (event) => {
    event.preventDefault()
    // Replace with API call
    axios.post('http://localhost:8000/auth/login/', { username, password })
      .then(response => {
        console.log('Login successful', response.data)
        navigate('/home')
      })
      .catch(error => {
        console.error('Login failed', error)
      })
  }

  return (
    <div className="auth-layout">
      <div className="auth-card">
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-subtitle">Sign in to continue editing your resume</p>
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
            placeholder="••••••••"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-button">
            Sign in
          </button>
        </form>
        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/signup">Create one</Link>
        </p>
      </div>
    </div>
  )
}

export default Login


