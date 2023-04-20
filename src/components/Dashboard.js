import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../context/AuthContext"
import { Link, useHistory } from "react-router-dom"
import "./Dashboard.scss"
export default function Dashboard() {
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  const history = useHistory()

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <div className="Dashboard">
      <div className="Container">
        <img src = "https://img.freepik.com/free-vector/night-ocean-landscape-full-moon-stars-shine_107791-7397.jpg?w=2000" className="Avatar"/>
          {error && <Alert variant="danger">{error}</Alert>}
          <h4 className="Profile_email"><strong>Email:</strong> {currentUser.email}</h4>
          <Link to="/update-profile" className="Update_profile">
            Update Profile
          </Link>
          <button className="Logout" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  )
}