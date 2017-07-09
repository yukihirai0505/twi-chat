module.exports = {
  getUsers: {
    config: {
      method: 'get',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/user'
  },
  createUser: {
    config: {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    path: '/user'
  }
}