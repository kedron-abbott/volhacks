import React from "react"

const UserContext = React.createContext({})

class UserProvider extends React.Component {
  state = {
    user: this.getUserFromLS(),
  }

  getUserFromLS() {
    const user = localStorage.getItem("user")
    if (user === null) {
      return undefined
    }
    return JSON.parse(user)
  }

  setUser = user => {
    this.setState({ user })
  }

  render() {
    const { user } = this.state

    return (
      <UserContext.Provider value={{ user, setUser: this.setUser }}>
        {this.props.children}
      </UserContext.Provider>
    )
  }
}

const withUser = Component => props => (
  <UserContext.Consumer>
    {userProps => <Component {...props} {...userProps} />}
  </UserContext.Consumer>
)

export { UserProvider, withUser }
export default UserContext
