import React from "react";
import Router from "next/router";
import axios from "axios";

function checkAuth(WrappedComponent) {
  function whoAmI() {
    const Axios = axios.create({ withCredentials: true });
    return Axios.get(process.env.API_URL + "/whoami");
  }

  const loadingPageStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    fontSize: "2em"
  };
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        waiting: true
      };
    }

    componentDidMount() {
      whoAmI()
        .then(response => {
          this.setState({ waiting: false });
        })
        .catch(err => {
          //set window location to login page
          Router.push("/login");
        });
    }

    render() {
      if (this.state.waiting) {
        return (
          <div style={loadingPageStyle}>
            <h1>Loading...</h1>
          </div>
        );
      }

      return <WrappedComponent {...this.props} />;
    }
  };
}

export default checkAuth;
