import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./Login.scss"

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    /*catch {
      setError("Failed to log in")
      console.log("hello")
    }*/

    setLoading(false)
  }

  return (
      <div className="Logout_container">
          <h2 className="title">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form className="Logout_form" onSubmit={handleSubmit}>
            <Form.Group id="email" className="email">
              <Form.Label className="Email_label">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required className="Email_input"/>
            </Form.Group>
            <Form.Group id="password" className="password">
              <Form.Label className="Password_label">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required className="Password_input"/>
            </Form.Group>
            <Button className="Login_button" disabled={loading} type="submit">
              Log In
            </Button>
          </Form>
          
          <div className="forgot">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
      
      <div className="signup">
        Need an account? <Link className="signup_link" to="/signup">Sign Up</Link>
      </div>
      </div>
    
  )
}
