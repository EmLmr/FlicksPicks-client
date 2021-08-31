import React from "react";
import { Link } from "react-router-dom";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

import "./navbar.scss";

const logo = require("../../public/img/logo.png");

export class NavBar extends React.Component {
  render() {
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
              <Nav.Link className="linkText" href="/">
                Movies
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="linkText" href="/directors">
                Directors
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link className="linkText" href="/genres">
                Genres
              </Nav.Link>
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
    </Navbar>;
  }
}
