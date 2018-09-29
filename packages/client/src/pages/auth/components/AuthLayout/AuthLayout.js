import React from "react"
import "./AuthLayout.css"

const AuthLayout = ({ children }) => (
  <div className="auth-layout">
    <div className="auth-layout__container">{children}</div>
  </div>
)

export default AuthLayout
