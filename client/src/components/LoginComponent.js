import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser ,loginUserMobile } from "../actions/authActions";
import propTypes from "prop-types";
import classnames from "classnames";
import {
  Link,
} from "react-router-dom";
class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      mobileNumber: "",
      password: "",
      errors: {},
      disabled: false,
      
    };

    this.onChange = this.onChange.bind(this);
    this.onChangeMobile = this.onChangeMobile.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitMobile = this.onSubmitMobile.bind(this);
  }
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/");
    }
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
    return nextProps.changedProp !== this.state.changedProp;
  } 
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onChangeMobile(e) {
    this.setState({ mobileNumber: e.target.value });
    if (this.state.mobileNumber.length === 9) {     
      this.props.loginUserMobile(e.target.value);
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  onSubmitMobile(e) {
    e.preventDefault();
    if (this.state.mobileNumber.length === 10) 
    {
      
      const userDataMobile = {
        mobileNumber: this.state.mobileNumber,
      };
      this.props.history.push({
        pathname: "/otpverify",
        state: { mobileNumber: this.state.mobileNumber }
      })
      
    }
    else {
      this.setState({
        errors: {
          mobileNumber: "Enter Mobile Number"
        }
      })
    }
  }
 

  render() {
    const { errors } = this.state;
    const {status} = this.props.auth;
      return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto" id="email">
                <h3 className="text-center">Log In with Email</h3>
                <p className="lead text-center"></p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="string"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.email
                      })}
                      placeholder="Email ID"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChange}
                    />
                    {errors.email && (
                      <div className="invalid-feedback">{errors.email}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <input
                      type="password"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.password
                      })}
                      placeholder="Password"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChange}
                    />
                    {errors.password && (
                      <div className="invalid-feedback">{errors.password}</div>
                    )}
                  </div>
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-info btn-block mt-4"
                  />
                </form>
              <br/>
                <center><Link to={"/signup"}>Signup</Link></center>
              </div>
              <div className="col-md-6 m-auto">
                <h3 className="text-center">Log In with Mobile Number</h3>
                <p className="lead text-center"></p>
                <form onSubmit={this.onSubmitMobile}>
                  <div className="form-group">
                    <input
                      type="number"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.mobileNumber
                      })}
                      placeholder="Mobile Number"
                      name="mobileNumber"
                      value={this.state.mobileNumber}
                      onChange={this.onChangeMobile}
                    />
                    {errors.mobileNumber && (
                      <div className="invalid-feedback">{errors.mobileNumber}</div>
                    )}
                  </div>
                 { status === 200  ? ( <input
                    type="submit"
                    value="Submit"
                    className="btn btn-info btn-block mt-4"
                  />):(
                      <input
                        type="submit"
                        value="Submit"
                        disabled="disabled"
                        className="btn btn-info btn-block mt-4"
                      />
                  )
                 }
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}

LoginComponent.propTypes = {
  loginUser: propTypes.func.isRequired,
  loginUserMobile: propTypes.func.isRequired,
  auth: propTypes.object.isRequired,
  errors: propTypes.object.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
  value: state.value,
});
export default connect(
  mapStateToProps,
  { loginUser,loginUserMobile }
)(LoginComponent);
