import './index.css'

import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    inputUserName: '',
    inputPassword: '',
    isLoginFailure: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({
      inputUserName: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      inputPassword: event.target.value,
    })
  }

  onSuccessfulLogin = jwttoken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwttoken, {expires: 10})
    history.replace('/')
  }

  onFailureLogin = message => {
    this.setState({isLoginFailure: true, errorMsg: message})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {inputUserName, inputPassword} = this.state
    const userDetails = {
      username: inputUserName,
      password: inputPassword,
    }
    const loginUrl = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(loginUrl, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessfulLogin(data.jwt_token)
    } else {
      this.onFailureLogin(data.error_msg)
    }
  }

  renderLoginPage = () => {
    const {isLoginFailure, errorMsg, inputPassword, inputUserName} = this.state
    return (
      <div className="loginPage-background-section">
        <div className="login-box">
          <img
            className="login-logo"
            alt="website logo"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          />
          <form onSubmit={this.onSubmitForm} className="login-form-container">
            <div className="login-input-container">
              <label className="login-label" htmlFor="login-username">
                USERNAME
              </label>
              <input
                type="text"
                className="login-input"
                id="login-username"
                placeholder="Username"
                onChange={this.onChangeUsername}
                value={inputUserName}
              />
            </div>
            <div className="login-input-container">
              <label className="login-label" htmlFor="login-password">
                PASSWORD
              </label>
              <input
                className="login-input"
                id="login-password"
                placeholder="Password"
                type="password"
                value={inputPassword}
                onChange={this.onChangePassword}
              />
            </div>
            <button
              onClick={this.onSubmitForm}
              type="submit"
              className="login-button"
            >
              Login
            </button>
            {isLoginFailure && (
              <p className="login-error-message">*{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return this.renderLoginPage()
  }
}

export default Login
