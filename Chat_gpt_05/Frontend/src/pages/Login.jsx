import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import '../styles/global.css'
import '../styles/theme.css'
import '../styles/auth.css'
import axios from 'axios'

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  
  const navigate = useNavigate()
  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("http://localhost:3000/api/auth/login",{
            email: formData.email,
            password: formData.password
        },{
            withCredentials:true
        }).then(response => {
            console.log('Login successful:', response.data)
            navigate('/')
    }).catch(error => {
        console.error('Login failed:', error)
    })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1 className="auth-title">Welcome Back</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="form-input"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-input"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
        
        <div className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  )
}

export default Login
