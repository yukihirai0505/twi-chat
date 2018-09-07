import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './SignIn.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class SignIn extends Component {
  static propTypes = {
    handleLogin: PropTypes.any
  }

  constructor(props) {
    super(props)
  }

  async componentDidMount() {}

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <h1>Twi Chat</h1>
          <p>
            Chatting with your <FontAwesomeIcon icon={['fab', 'twitter']} />{' '}
            account :)
          </p>
          <form className="form">
            <button
              type="submit"
              onClick={this.props.handleLogin}
              id="login-button"
            >
              <FontAwesomeIcon icon={['fab', 'twitter']} /> Sign In
            </button>
          </form>
        </div>

        <ul className="bg-bubbles">
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </div>
    )
  }
}

export default SignIn
