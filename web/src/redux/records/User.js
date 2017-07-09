import {Record} from 'immutable'

const UserRecord = Record({list: [], showList: []})

export default class User extends UserRecord {

  getUser(data) {
    return this.set('list', data)
  }

  showPassword(data) {
    return this.set('showList', data)
  }
}