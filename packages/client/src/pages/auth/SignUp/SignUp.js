import React from "react"
import to from "await-to-js"
import { Link } from "react-router-dom"
import { Button, TextField, SelectField } from "react-md"
import AuthLayout from "../components/AuthLayout"
import { signUp } from "actions/auth"
import "./SignUp.css"

class SignUpPage extends React.Component {
  signUp = async e => {
    e.preventDefault()

    const fullName = document.getElementById("sign-up__full-name").value
    const email = document.getElementById("sign-up__email").value
    const password = document.getElementById("sign-up__password").value
    const confirmPassword = document.getElementById("sign-up__confirm-password")
      .value
    const countryCode = document.getElementById("sign-up__country-code").value
    const phone = document.getElementById("sign-up__phone").value

    if (password !== confirmPassword) {
      console.log("password !== confirmPassword")
    } else {
      let error, response
      ;[error, response] = await to(
        signUp(fullName, email, password, countryCode, phone),
      )

      if (error) {
        let errorMessage
        try {
          errorMessage = error.response.data.message || error.message
        } catch (error) {
          errorMessage = error.message
        }
        this.setState({ error: errorMessage })
      } else {
        // Navigate to verify page
        this.props.history.push({
          pathname: `/verify/${response.data.user._id}`,
          state: { user: response.data.user },
        })
      }
    }
  }

  render() {
    return (
      <AuthLayout>
        <h1>App</h1>

        <form className="auth-layout__form" onSubmit={this.signUp}>
          <TextField id="sign-up__full-name" label="Full Name" fullWidth />
          <TextField id="sign-up__email" label="Email" type="email" fullWidth />
          <TextField
            id="sign-up__password"
            label="Password"
            type="password"
            fullWidth
          />
          <TextField
            id="sign-up__confirm-password"
            label="Confirm Password"
            type="password"
            fullWidth
          />

          <div className="sign-up__phone">
            <SelectField
              id="sign-up__country-code"
              label="Code"
              menuItems={COUNTRY_CODE}
            />

            <TextField id="sign-up__phone" label="Phone Number" />
          </div>

          <Button raised primary type="submit">
            Sign Up
          </Button>
        </form>
        <Link to="/sign-in">Sign In</Link>
      </AuthLayout>
    )
  }
}

export default SignUpPage

const COUNTRY_CODE = [
  {
    label: "US +1",
    value: "+1",
  },
  {
    value: "+2",
  },
  {
    value: "+3",
  },
  {
    value: "+4",
  },
]
