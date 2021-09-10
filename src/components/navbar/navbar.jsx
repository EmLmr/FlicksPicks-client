import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./navbar.scss";

const logo = require("../../public/img/logo.png");

export class NavBar extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  };

  render() {
    const { user } = this.props;
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
            <Navbar.Collapse className="nav-elements ">
              <Link className="linkText" to={`/`}>
                Movies
              </Link>
              <Link className="linkText" to={`/genres`}>
                Genres
              </Link>
              <Link className="linkText" to={`/directors`}>
                Directors
              </Link>
              <Link className="linkText" to={profile}>
                Profile
              </Link>

              <Button
                size="sm"
                bsPrefix="logout-btn"
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
