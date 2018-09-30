import React from "react"
import { Link } from "react-router-dom"
import { Button, TextField } from "react-md"
import { withUser } from "contexts/User"
import AuthLayout from "./components/AuthLayout"
import { signIn } from "actions/auth"

class SignInPage extends React.Component {
  state = { error: "" }

  signIn = async e => {
    e.preventDefault()

    const email = document.getElementById("sign-in__email").value
    const password = document.getElementById("sign-in__password").value

    try {
      const user = await signIn(email, password)
      this.props.setUser(user)
      this.props.history.push("/")
    } catch (error) {
      this.setState({ error })
    }
  }

  render() {
    return (
      <AuthLayout>
        <h1>App</h1>

        <form className="auth-layout__form" onSubmit={this.signIn}>
          <TextField id="sign-in__email" label="Email" type="email" fullWidth />
          <TextField
            id="sign-in__password"
            label="Password"
            type="password"
            fullWidth
          />
          <Button raised primary type="submit">
            Sign In
          </Button>
        </form>
        <Link to="/sign-up">Sign Up</Link>
      </AuthLayout>
    )
  }
}

export default withUser(SignInPage)
