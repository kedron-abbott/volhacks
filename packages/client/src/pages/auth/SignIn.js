import React from "react"
import { Link } from "react-router-dom"
import { Button } from "react-md"
import AuthLayout from "./components/AuthLayout"

const SignInPage = () => (
  <AuthLayout>
    <Button raised primary iconChildren="home" iconBefore={false}>
      Sign In
    </Button>
    <br />
    <Link to="/">Home</Link>
  </AuthLayout>
)

export default SignInPage
