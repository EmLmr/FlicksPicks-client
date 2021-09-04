import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./navbar.scss";

const logo = require("../../public/img/logo.png");

export class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { user } = this.props;
    const movies = `/`;
    const profile = `/users/${user}`;

    if (!user) return null;

    return (
      <Navbar className="navbar justify-content-end" activeKey="/">
        <div className="logo">
          <Link to={`/`}>
            <img alt="" src={logo} className="navbar-logo d-inline-block align-top" />
          </Link>
        </div>
        <Container className="nav-container justify-content-end">
          <Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav " />
            <Navbar.Collapse className="nav-elements " id="basic-navbar-nav hamburger-nav ">
              <Nav.Item>
                <Link className="linkText" to={`/`}>
                  Movies
                </Link>
                <Link className="linkText" to={`/genres`}>
                  Genres
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="linkText" to={`/users/:username`}>
                  Profile
                </Link>
              </Nav.Item>
              <Button
                size="sm"
                variant="danger"
                className="logout-btn"
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
                Log out
              </Button>
            </Navbar.Collapse>
          </Navbar.Brand>
        </Container>
      </Navbar>
    );
  }
}

export default NavBar;
