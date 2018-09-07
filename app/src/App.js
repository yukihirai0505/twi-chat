import React, { Component } from 'react'
import './App.css'
import { database, auth, providerTwitter } from './config/config'
import { getUserName, getPhotoURL } from './utils/auth'
import moment from 'moment-timezone'
import SignIn from './pages/SignIn'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      position: {
        x: undefined,
        y: undefined
      },
      messages: []
    }
  }

  async componentDidMount() {
    // User
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

    // DB
    const callback = snap => {
      const { messages } = this.state
      let data = snap.val()
      this.setState({
        messages: messages.concat([data])
      })
    }
    database
      .ref('/messages/')
      .limitToLast(100)
      .on('child_added', callback)
    database
      .ref('/messages/')
      .limitToLast(100)
      .on('child_changed', callback)
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
    }
  }

  handleLogin = e => {
    e.preventDefault()
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

  getTwitterScreenName = () => {
    const { user } = this.state
    // TODO:// アクセストークンからscreen name とってこないと取れない系？w
    // if (user && user.providerData) {
    //
    // }
  }

  renderMessage = (photoUrl, name, x, y, inputBtn) => {
    return (
      <div
        className="message"
        style={{
          position: 'absolute',
          left: x,
          top: y
        }}
      >
        <a href="http://twitter.com/" target="_blank">
          <div className="faceicon">
            <img src={photoUrl} alt="" />
          </div>
        </a>
        <div className="chatting">
          <div className="says">{inputBtn}</div>
        </div>
        <span style={{ fontSize: '10px', fontWeight: 'bold' }}>
          <a href="http://twitter.com/" target="_blank">
            {name}
          </a>
        </span>
      </div>
    )
  }

  render() {
    const { user, position, messages } = this.state
    let hasPosition = position && position.x && position.y
    return user ? (
      <div className="App" onClick={this.clickScreen}>
        <button className="square_btn" onClick={this.handleSignOut}>
          ログアウト
        </button>
        <div id="cloud" />
        {messages.map(message =>
          this.renderMessage(
            message.profilePicUrl,
            message.name,
            message.x,
            message.y,
            <p>{message.text}</p>
          )
        )}
        {hasPosition &&
          this.renderMessage(
            getPhotoURL(),
            getUserName(),
            position.x,
            position.y,
            <input
              id="message"
              onClick={this.inputBtn}
              onKeyUp={this.sendMessage}
            />
          )}
      </div>
    ) : (
      <SignIn handleLogin={this.handleLogin} />
    )
  }
}

export default App
