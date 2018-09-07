import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

export const app = !firebase.apps.length
  ? firebase.initializeApp({
      apiKey: 'AIzaSyCksIo1pmdJxrUhFeye6SPATf8SN5JjyTA',
      authDomain: 'twichat-85790.firebaseapp.com',
      databaseURL: 'https://twichat-85790.firebaseio.com',
      projectId: 'twichat-85790'
    })
  : firebase.app()

export const auth = app.auth()
export const database = app.database()
export const providerTwitter = new firebase.auth.TwitterAuthProvider()
export default firebase
