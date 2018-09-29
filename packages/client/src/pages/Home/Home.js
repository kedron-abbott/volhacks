import React from "react"
import { Link } from "react-router-dom"
import { Button, FontIcon } from "react-md"

const HomePage = () => (
  <div>
    <Button raised primary iconChildren="home" iconBefore={false}>
      Home
    </Button>
    <FontIcon primary>home</FontIcon>
    <br />
    <Link to="sign-in">Sign In</Link>
  </div>
)

export default HomePage
