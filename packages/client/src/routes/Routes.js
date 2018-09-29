import React from "react"
import { BrowserRouter, Switch, Route } from "react-router-dom"
// Pages
import HomePage from "pages/Home"
import SignInPage from "pages/auth/SignIn"
import SignUpPage from "pages/auth/SignUp"
import NotFoundPage from "pages/NotFound"

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/sign-in" component={SignInPage} />
      <Route path="/sign-up" component={SignUpPage} />
      <Route component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
)

export default Routes
