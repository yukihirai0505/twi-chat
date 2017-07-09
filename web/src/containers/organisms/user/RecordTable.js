import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {getUsers, showPassword} from "../../../redux/modules/User";

class RecordTable extends Component {

  constructor() {
    super()
  }

  componentWillMount() {
    this.props.showPassword([])
    this.props.getUsers()
  }

  showAction(cKey) {
    const {showPassword, showList} = this.props
    const index = showList.findIndex((item) => item.id === cKey)
    if (index >= 0) {
      showPassword([
        ...showList.slice(0, index),
        showList[index] + 1,
        ...showList.slice(index + 1)
      ])
    } else {
      showPassword(showList.concat({id: cKey}))
    }
  }

  render() {
    const {users, showList} = this.props
    const list = users && users.map((user, cKey) => {
        const isShow = showList.filter(item => item.id === cKey).length > 0
        return <tr key={cKey}>
          <td>{user.id}</td>
          <td>{user.name}</td>
          <td></td>
          <td>
            <div className="row">
              <div className="col-md-8">
                {isShow ? user.password : '**********'}
              </div>
              <div className="col-md-3">
                <button
                  className={isShow ? 'btn btn-sm' : 'btn btn-sm btn-info'}
                  onClick={this.showAction.bind(this, cKey)}>
                  {isShow > 0 ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
          </td>
        </tr>
      })

    return (
      <div className="card">
        <div className="card-header">
          <i className="fa fa-align-justify"/> List
        </div>
        <div className="card-block">
          <table className="table">
            <thead>
            <tr>
              <th>ID</th>
              <th>DisplayName</th>
              <th>UserName</th>
              <th>Password</th>
            </tr>
            </thead>
            <tbody>
            {list}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    users: state.user.list,
    showList: state.user.showList
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(Object.assign({}, {getUsers, showPassword}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RecordTable)
