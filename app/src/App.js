import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { auth, providerTwitter } from './config'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      position: {
        x: undefined,
        y: undefined
      }
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

  clickScreen = e => {
    this.setState({
      position: {
        x: e.pageX,
        y: e.pageY
      }
    })
  }

  inputBtn = e => {
    e.stopPropagation()
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
    const { user, position } = this.state
    return (
      <div className="App" onClick={this.clickScreen}>
        {/*<header className="App-header">*/}
        {/*<img src={logo} className="App-logo" alt="logo"/>*/}
        {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
        {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {position &&
          position.x &&
          position.y && (
            <input
              style={{
                position: 'absolute',
                left: position.x,
                top: position.y
              }}
              onClick={this.inputBtn}
            />
          )}
        {user ? (
          <button onClick={this.handleSignOut}>Sign out with Twitter</button>
        ) : (
          <button onClick={this.handleLogin}>Login with Twitter</button>
        )}
      </div>
    )
  }
}

export default App
