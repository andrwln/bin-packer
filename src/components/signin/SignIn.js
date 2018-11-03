import React, { Component } from "react";
import Router from "next/router";
import { connect } from "react-redux";

import "./signIn.scss";

import { logInUser } from "../../store/features/canvas/actions";

// import Logo from "../src/assets/images/4over-logo.png";

class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      uuid: "a4377724-8819-4a96-bc2b-3877b269f989",
      is_fetching: false
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.validateForm = this.validateForm.bind(this);
  }

  componentDidUpdate() {
    if (this.props.isAuthenticated) {
      Router.push("/");
    }
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  onChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  handleKeyPress(evt) {
    if (evt.key === "Enter") {
      this.onSubmit(evt);
    }
  }

  onSubmit(evt) {
    this.setState({
      is_fetching: true
    });

    evt.preventDefault();

    let data = {
      email: this.state.email,
      password: this.state.password,
      organization_uuid: this.state.uuid,
      is_fetching: true
    };

    this.props.dispatch(logInUser(data));
  }

  render() {
    return (
      <div className="signin-page-container">
        <div className="form-container box">
          <form>
            <div className="form-el">Email</div>
            <div className="form-el">
              <input
                name="email"
                onChange={this.onChange}
                onKeyPress={this.handleKeyPress.bind(this)}
              />
            </div>
            <div className="form-el">Password</div>
            <div className="form-el">
              <input
                type="password"
                name="password"
                onChange={this.onChange}
                onKeyPress={this.handleKeyPress.bind(this)}
              />
            </div>
            <div className="form-el">
              <div className="submit-btn" onClick={this.onSubmit}>
                Submit
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { isAuthenticated: state.canvas.isAuthenticated };
};

export default connect(mapStateToProps)(SignIn);
