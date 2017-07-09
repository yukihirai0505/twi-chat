import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import App from './containers/App'
import User from './containers/pages/user/Index'
import CreateUser from './containers/pages/user/Create'
import Confirm from './containers/pages/user/Confirm'
import Dashboard from './containers/pages/dashboard/Index'

export function getPathName(pathName) {
  const paths = [
    {path: '/', name: 'Home'},
    {path: '/dashboard', name: 'Dashboard'},
    {path: '/user', name: 'User'},
    {path: '/user/create', name: 'Create'},
    {path: '/user/create/confirm', name: 'Complete'},
  ]
  return paths.map((p) => {
    if (p.path === pathName) {
      return p.name
    }
  })
}

export default (
  <App>
    <Switch>
      <Route exact path="/dashboard" component={Dashboard}/>
      <Route exact path="/user" component={User}/>
      <Route exact path="/user/create" component={CreateUser}/>
      <Route exact path="/user/create/confirm" component={Confirm}/>
      <Redirect from="/" to="/dashboard"/>
    </Switch>
  </App>
)
