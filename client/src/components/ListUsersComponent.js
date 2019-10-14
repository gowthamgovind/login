import React, { Component } from "react";
import "../App.css";
import { connect } from "react-redux";
import propTypes from "prop-types";
import { getUsers } from "../actions/authActions";
class ListUsersComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      data: false,
      success: false
    };
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/users");
    }
    this.props.getUsers()
  }
  
  render() {
    const { users } = this.props.auth;
    const length = users.length;
    
    return length > 0 ? (
      <div className="container">
        <h2 className="text-center">Users</h2>
        <br />
        <div className="alert alert-danger hide">Unable to delete</div>
        <div className=" table-responsive">
          <table className="table  table-bordered table-hover">
            <thead>
              <tr>
                <th scope="col">
                  <center>S.NO</center>
                </th>
                <th scope="col">
                  <center>NAME</center>
                </th>
                <th scope="col">
                  <center>EMAIL ID</center>
                </th>
                <th scope="col">
                  <center>MOBILE NUMBER</center>
                </th>
                <th scope="col">
                  <center>IS ADMIN?</center>
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => (
                <tr key={i}>
                  <th scope="row">
                    <center>{i + 1}</center>
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNumber}</td>
                  <td>{user.isAdmin}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div className="container">
        <div className="jumbotron alert alert-warning">Fetching Data...</div>
      </div>
    );
  }
}

ListUsersComponent.propTypes = {
  auth: propTypes.object.isRequired,
};
const mapStateToProps = state => ({
  auth: state.auth,
});
export default connect(
  mapStateToProps,
  { getUsers }
)(ListUsersComponent);
