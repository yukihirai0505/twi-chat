import React, { Component } from 'react'
import './App.css'
import { database, auth, providerTwitter } from './config/config'
import { getUserName, getPhotoURL } from './utils/auth'
import moment from 'moment-timezone'

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

  sendMessage = e => {
    const { position } = this.state
    if (e.keyCode === 13) {
      let message = document.getElementById('message')
      database.ref('/messages/').push({
        name: getUserName(),
        text: message.value,
        profilePicUrl: getPhotoURL(),
        x: position.x,
        y: position.y,
        time: moment()
          .tz('Asia/Tokyo')
          .unix()
      })
      message.value = ''
      this.setState({
        position: {
          x: undefined,
          y: undefined
        }
      })
      console.log('enter!')
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
    const { user, position } = this.state
    let hasPosition = position && position.x && position.y
    return user ? (
      <div className="App" onClick={this.clickScreen}>
        {/*<header className="App-header">*/}
        {/*<img src={logo} className="App-logo" alt="logo"/>*/}
        {/*<h1 className="App-title">Welcome to React</h1>*/}
        {/*</header>*/}
        {/*<p className="App-intro">*/}
        {/*To get started, edit <code>src/App.js</code> and save to reload.*/}
        {/*</p>*/}
        {hasPosition && (
          <div
            style={{
              position: 'absolute',
              left: position.x,
              top: position.y
            }}
          >
            <img src={getPhotoURL()} alt=""/>
            <span>{getUserName()}</span>
            <input
              id="message"
              onClick={this.inputBtn}
              onKeyUp={this.sendMessage}
            />
          </div>
        )}
        <button onClick={this.handleSignOut}>Sign out with Twitter</button>
      </div>
    ) : (
      <button onClick={this.handleLogin}>Login with Twitter</button>
    )
  }
}

export default App
