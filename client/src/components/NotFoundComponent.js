import React, { Component } from "react";
import "../App.css";
export default class NotFoundComponent extends Component {
  render() {
    const topics = this.state;
    return (
      <div style={{ marginTop: 50 }}>
        <h3>Page Not Found</h3>
      </div>
    );
  }
}
