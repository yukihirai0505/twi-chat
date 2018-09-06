import firebase from 'firebase/app'
import 'firebase/auth'

export const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyCksIo1pmdJxrUhFeye6SPATf8SN5JjyTA',
      authDomain: 'twichat-85790.firebaseapp.com',
      projectId: 'twichat-85790'
    })
  : firebase.app()

export const auth = app.auth()
export const providerTwitter = new firebase.auth.TwitterAuthProvider()
export default firebase
