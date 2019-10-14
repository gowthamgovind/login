import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import propTypes from "prop-types";
class DashboardComponent extends Component {
  render() {
    return (
      <div style={{ marginTop: 50 }}>
        <center><h3>Welcome {this.props.auth.user.name} </h3></center>
      </div>
    );
  }
}
DashboardComponent.propTypes = {
  auth: propTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
)(DashboardComponent);