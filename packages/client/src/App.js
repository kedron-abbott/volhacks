import React from "react"
import Routes from "./routes"
import { UserProvider } from "contexts/User"

const App = () => (
  <UserProvider>
    <Routes />
  </UserProvider>
)

export default App
