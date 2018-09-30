import React from "react"
import { TextField, Button } from "react-md"
import { withUser } from "contexts/User"
import { verify } from "actions/auth"
import "./Verify.css"

class VerifyPage extends React.Component {
  state = { code: "" }

  verify = async e => {
    e.preventDefault()

    const code = this.state.code
    const id = this.props.match.params.id

    try {
      const user = await verify(code, id)
      this.props.setUser(user)
      this.props.history.push("/")
    } catch (error) {
      this.setState({ error })
    }
  }

  render() {
    // const user = this.props.location.state.user

    return (
      <div className="verify">
        <TextField
          id="verify"
          label="Verification Code"
          value={this.state.code}
          onChange={value => {
            // Check if number
            // And str limit is 7
            if (value.match("^[0-9]*$") && value.length < 8) {
              this.setState({
                code: value,
              })
            }
          }}
        />
        <Button raised primary onClick={this.verify}>
          Verify
        </Button>
      </div>
    )
  }
}

export default withUser(VerifyPage)
