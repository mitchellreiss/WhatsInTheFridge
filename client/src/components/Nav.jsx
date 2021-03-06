import React, { Component } from "react";
// import { Link } from "react-router-dom";
import { Query } from "react-apollo";
import Queries from "../graphql/queries";
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

import Modal from "./Modal.jsx";
import Backdrop from "./Backdrop.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";

const { IS_LOGGED_IN } = Queries;

class Nav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loggingIn: false,
      signingUp: false
    };
  }

  startLoginHandler = () => {
    this.setState({ loggingIn: true });
  };

  modalLoginHandler = () => {
    this.setState({ loggingIn: false });
  };

  startSignupHandler = () => {
    this.setState({ signingUp: true });
  };

  modalSignupHandler = () => {
    this.setState({ signingUp: false });
  };

  modalCancelHandler = () => {
    this.setState({ loggingIn: false, signingUp: false });
  };

  render() {
    return (
      <ApolloConsumer>
        {client => (
          <Query query={IS_LOGGED_IN}>
            {({ data }) => {
              if (data.isLoggedIn) {
                return (
                  <div className="navbar">
                    <div className="l-side-navbar">
                      <div className="logo-in"></div>
                      <h1 className="title-in">What's in the Fridge?</h1>
                    </div>
                    <div className="nav-buttons">
                      <button
                        className="logout"
                        onClick={e => {
                          e.preventDefault();
                          localStorage.removeItem("auth-token");
                          client.writeData({ data: { isLoggedIn: false } });
                          this.props.history.push("/");
                        }}
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="navbar">
                    <div className="l-side-navbar">
                      <div className="logo"></div>
                      <h1 className="title">What's in the Fridge?</h1>
                    </div>
                    <div className="nav-buttons">
                      <React.Fragment>
                        {this.state.loggingIn && (
                          <Backdrop
                            canCancel
                            onCancel={this.modalCancelHandler}
                          />
                        )}
                        {this.state.loggingIn && (
                          <Modal
                            className="modal"
                            title="Log In"
                            canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalLoginHandler}
                            children={Login}
                            submit="Log In"
                          >
                            <Login />
                          </Modal>
                        )}
                        <div className="modal-control">
                          <button
                            className="btn"
                            onClick={this.startLoginHandler}
                          >
                            Log In
                          </button>
                        </div>
                      </React.Fragment>
                      <React.Fragment>
                        {this.state.signingUp && (
                          <Backdrop
                            canCancel
                            onCancel={this.modalCancelHandler}
                          />
                        )}
                        {this.state.signingUp && (
                          <Modal
                            className="modal"
                            title="Register"
                            canCancel
                            canConfirm
                            onCancel={this.modalCancelHandler}
                            onConfirm={this.modalSignupHandler}
                            children={Login}
                            submit="Log In"
                          >
                            <Register />
                          </Modal>
                        )}
                        <div className="modal-control">
                          <button
                            className="btn"
                            onClick={this.startSignupHandler}
                          >
                            Register
                          </button>
                        </div>
                      </React.Fragment>
                      <a
                        href="https://github.com/mitchellreiss/WhatsInTheFridge"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="git-link"
                      >
                        <i className="fab fa-github-square"></i>
                      </a>
                    </div>
                  </div>
                );
              }
            }}
          </Query>
        )}
      </ApolloConsumer>
    );
  }
}

export default withRouter(Nav);
