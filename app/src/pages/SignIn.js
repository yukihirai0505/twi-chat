import React, { Component } from 'react'
import './SignIn.css'

class SignIn extends Component {
  constructor(props) {
    super(props)
  }

  async componentDidMount() {
  }

  render() {
    return (
      <div className="wrapper">
        <div className="container">
          <h1>Twi Chat</h1>
          <p>Twitterログインして遊べる青空チャット</p>
          <form className="form">
            <button type="submit" onClick={this.props.handleLogin} id="login-button">Twitterログイン</button>
          </form>
        </div>

        <ul className="bg-bubbles">
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
          <li/>
        </ul>
      </div>
    )
  }
}

export default SignIn
