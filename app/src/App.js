import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { auth, providerTwitter } from './config'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      user: undefined
    }
  }

  async componentDidMount() {
    auth.onAuthStateChanged(user => {
      this.setState({ user })
    })
    const result = await auth.getRedirectResult().catch(error => {
      console.log('redirect result', error)
    })
    const user = result.user
    if (user) {
      this.setState({ user })
    }
  }

  handleLogin = () => {
    auth.signInWithRedirect(providerTwitter)
  }

  handleSignOut = () => {
    auth
      .signOut()
      .then(result => {
        this.setState({ user: undefined })
      })
      .catch(error => {
        console.log(error)
      })
  }

  render() {
    const { user } = this.state
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        {user ?
          <button onClick={this.handleSignOut}>Sign out with Twitter</button>
          :
          <button onClick={this.handleLogin}>Login with Twitter</button>
        }
      </div>
    )
  }
}

export default App
