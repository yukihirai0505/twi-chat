import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/index.css'
import App from './App'
import './config/fontawesome'
import registerServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
registerServiceWorker()
