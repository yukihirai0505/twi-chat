import React, {Component} from "react";
import {bindActionCreators} from "redux";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {withRouter} from "react-router";
import FieldInput from "../../../components/atoms/field/FieldInput";
import {createUser, showPassword} from "../../../redux/modules/User";
import * as validate from "../../../utils/Validate";

class Create extends Component {

  constructor() {
    super()
  }

  componentWillMount() {
    this.props.showPassword([])
  }

  showAction() {
    const {showPassword, showList} = this.props
    if (showList.length > 0) {
      showPassword([])
    } else {
      showPassword(showList.concat("ohhhh yes!!!"))
    }
  }

  handleSubmit(data) {
    this.props.createUser(data)
    this.props.history.push('/user/create/confirm')
  }

  render() {
    const {showList, handleSubmit} = this.props
    const isShow = showList.length > 0

    return (
      <div className="animated fadeIn">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">Create</div>

              <form
                className="form-horizontal"
                onSubmit={this.handleSubmit}
              >
                <div className="card-block">
                  <Field
                    id="displayName"
                    component={FieldInput}
                    name="displayName"
                    type="text"
                    labelText="DisplayName"
                    placeholder="Plz input DisplayName"
                    errors={{}}
                    validate={[validate.required()]}
                  />
                  <Field
                    id="userName"
                    component={FieldInput}
                    name="userName"
                    type="text"
                    labelText="UserName"
                    placeholder="Plz input UserName"
                    errors={{}}
                    validate={[validate.required()]}
                  />
                  <Field
                    id="password"
                    className="form-control"
                    component={FieldInput}
                    name="password"
                    type={isShow ? "text" : "password"}
                    labelText="Password"
                    placeholder="Plz input Password"
                    errors={{}}
                    validate={[validate.required()]}
                  />
                  <button
                    type="button"
                    className={isShow ? 'btn btn-sm' : 'btn btn-sm btn-info'}
                    onClick={this.showAction.bind(this)}>
                    {isShow ? 'Hide' : 'Show'}
                  </button>
                </div>
                <div className="card-footer">
                  <button
                    type="button"
                    className="btn btn-sm btn-primary"
                    onClick={handleSubmit(this.handleSubmit.bind(this))}
                  >
                    <i className="fa fa-dot-circle-o"/> Save
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    showList: state.user.showList
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, {createUser, showPassword}), dispatch)
}

let CreateUserForm = reduxForm({
  form: 'createUserForm',
  enableReinitialize: true
})(Create)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUserForm))