import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {createUser, showPassword} from '../../../redux/modules/User'

class Confirm extends Component {

  constructor() {
    super()
  }

  componentDidMount() {
    window.setTimeout(() => this.props.history.push('/user'), 3000)
  }

  render() {
    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Complete</div>
              <div className="card-block">
                <p>Complete!</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {}
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {createUser, showPassword}), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Confirm)