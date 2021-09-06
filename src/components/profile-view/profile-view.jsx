import React from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { Button, Card, Form, Row, Col, CardGroup } from "react-bootstrap";

import "./profile-view.scss";

export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavoriteMovies: [],
      validated: null,
    };
  }

  componentDidMount() {
    const accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  // get user
  getUser(token) {
    const username = localStorage.getItem("user");
    axios
      .get(`https://flickspicks.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavoriteMovies: response.data.FavoriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(`https://flickspicks.herokuapp.com/users/${username}/movies/${movie._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert("Movie removed from favorites!");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  updateProfile(e) {
    e.preventDefault();
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .put(
        `https://flickspicks.herokuapp.com/users/${username}`,
        {
          Username: this.state.Username,
          Password: this.state.Password,
          Email: this.state.Email,
          Birthday: this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert("User profile successfully updated.");
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${username}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  setUsername(input) {
    this.state.Username = input;
  }
  setPassword(input) {
    this.state.Password = input;
  }
  setEmail(input) {
    this.state.Email = input;
  }
  setBirthday(input) {
    this.state.Birthday = input;
  }

  deleteProfile(e) {
    e.preventDefault();

    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .delete(`https://flickspicks.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        alert("Your account has been deleted.");
        window.open(`/`, "_self");
      })
      .catch((e) => {
        console.log(e);
      });
  }

  render() {
    const { FavoriteMovies, validated } = this.state;
    const { movies } = this.props;

    return (
      <div className="profile-view ">
        <Form noValidate validated={validated} className="update-form" onSubmit={(e) => this.updateProfile(e)}>
          <Row className="update-profile">
            <Col>
              <h1>Update profile:</h1>
              <Form.Group controlId="formBasicUsername">
                <Form.Label controlId="username" className="form-label" label="Username">
                  Username:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.Username}
                  onChange={(e) => this.setState({ Username: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label controlId="username" className="form-label" label="Password">
                  Password:<span className="required">*</span>
                </Form.Label>
                <Form.Control
                  type="password"
                  value={this.state.Password}
                  onChange={(e) => this.setState({ Password: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label controlId="username" className="form-label" label="Email">
                  Email:
                </Form.Label>
                <Form.Control
                  type="email"
                  value={this.state.Email}
                  onChange={(e) => this.setState({ Email: e.target.value })}
                />
              </Form.Group>

              <Form.Group controlId="formBasicBirthday">
                <Form.Label controlId="username" className="form-label" label="Birthday">
                  Birthday:
                </Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.Birthday}
                  onChange={(e) => this.setState({ Birthday: e.target.value })}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Row className="justify-content-center">
          <Button variant="danger" type="submit">
            Update
          </Button>
        </Row>

        <Row>
          <Col className="delete-profile">
            <h3>Delete account?</h3>
            <Button variant="danger" onClick={(e) => this.deleteProfile(e)}>
              Delete Account
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center">
          <Col className="favorite-movies">
            <h1>Your favorite movies:</h1>

            {FavoriteMovies.length === 0 && <div className="text-center">No favorites yet :(</div>}

            {FavoriteMovies.length > 0 &&
              movies.map((movie) => {
                if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                  return (
                    <CardGroup className="favorites-list">
                      <Card className="favorites-item card-content" key={movie._id}>
                        <Card.Img className="movie-poster" variant="top" crossOrigin="anonymous" src={movie.ImageURL} />
                        <Card.Body>
                          <Card.Title className="card-title">{movie.Title}</Card.Title>
                          <Button
                            size="sm"
                            className="profile-button remove-favorite"
                            variant="danger"
                            value={movie._id}
                            onClick={(e) => this.removeFavorite()}
                          >
                            Remove
                          </Button>
                        </Card.Body>
                      </Card>
                    </CardGroup>
                  );
                }
              })}
          </Col>
        </Row>
      </div>
    );
  }
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.shape({
        _id: PropTypes.string.isRequired,
        Title: PropTypes.string.isRequired,
      })
    ),
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birthday: PropTypes.string.isRequired,
  }),
};
