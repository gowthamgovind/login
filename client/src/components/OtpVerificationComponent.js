import React, { Component } from "react";
import { connect } from "react-redux";
import { otp, loginUserMobile, setGenerate } from "../actions/authActions";
import propTypes from "prop-types";
import classnames from "classnames";
class OtpVerificationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mobileNumber: "",
      otp: "",
      errors: ""
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onSubmitGen = this.onSubmitGen.bind(this);
  }
 componentDidMount(){

  this.setState({
    mobileNumber: this.props.location.state.mobileNumber
  })
   
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
  onSubmitGen(e){
    this.props.loginUserMobile(this.state.mobileNumber);
  }
  onSubmit(e) {
    e.preventDefault();
    const userDataOtp = {
      mobileNumber: this.state.mobileNumber,
      otp: this.state.otp,
    };
    
    if(userDataOtp.otp.length === 6)
    {
      this.props.otp(userDataOtp);
    }
    else{
      this.setState({
        errors:  {
          msg: "Enter correct OTP"
        } 
      })
    }
    
  }
  render() {
    const { errors } = this.state;
    const {genStatus} = this.props.auth;
      return (
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-6 m-auto">
                <h1 className="display-4 text-center">Enter OTP</h1>
                <p className="lead text-center"></p>
                <form onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <input
                      type="number"
                      className={classnames("form-control form-control-lg", {
                        "is-invalid": errors.msg
                      })}
                      placeholder="Enter OTP"
                      name="otp"
                      value={this.state.otp}
                      onChange={this.onChange}
                    />
                    {errors.msg && (
                      <div className="invalid-feedback">{errors.msg}</div>
                    )}
                    
                  <input
                    type="submit"
                    value="Login"
                    className="btn btn-info btn-block mt-4"
                  />
                  {}
                    {errors.msg === "OTP Expired.Generate a new one" ? (
                    <button
                    onClick={this.onSubmitGen}
                      type="submit"
                      
                      className="btn btn-info btn-block mt-4"
                      >Regenerate OTP</button>
                  ):(<br/>)}
                    {genStatus !== "" ? (<div className="alert alert-primary">Enter the OTP Sent to Number {this.state.mobileNumber}</div>):(
                    <p></p>
                  )}
                  </div>
                </form>
              </div>

              </div>
            </div>
          </div>
      );
    }
}


OtpVerificationComponent.propTypes = {
  otp: propTypes.func.isRequired,
  loginUserMobile: propTypes.func.isRequired,
  errors: propTypes.object.isRequired,
  setGenerate: propTypes.func.isRequired
};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});
export default connect(
  mapStateToProps,
  { otp, loginUserMobile,setGenerate}
)(OtpVerificationComponent);