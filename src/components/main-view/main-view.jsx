import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

import { NavBar } from "../navbar/navbar";
import { LoginView } from "../login-view/login-view";
import { RegistrationView } from "../registration-view/registration-view";
import { MovieView } from "../movie-view/movie-view";
import { MovieCard } from "../movie-card/movie-card";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      genres: [],
      directors: [],
      user: null,
      register: true,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
      this.getGenres(accessToken);
      this.getDirectors(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get("https://flickspicks.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Assign the result to the state
        this.setState({
          movies: response.data,
        });
        console.log("Movies:", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getGenres(token) {
    axios
      .get("https://flickspicks.herokuapp.com/genres", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          genres: response.data,
        });
        console.log("Genres:", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  getDirectors(token) {
    axios
      .get("https://flickspicks.herokuapp.com/directors", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          directors: response.data,
        });
        console.log("Directors:", response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
    this.getGenres(authData.token);
    this.getDirectors(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { movies, user, genres, directors } = this.state;

    return (
      <Router>
        <NavBar user={user} />
        <Row className="main-view justify-content-center">
          {/*  ALL MOVIES / HOME PAGE */}
          <Route
            exact
            path="/"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              return movies.map((m) => (
                <Col sm={12} md={6} lg={4} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />
          {/*  USER REGISTRATION */}
          <Route
            path="/register"
            render={() => {
              if (user) return <Redirect to="/" />;
              return (
                <Col>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/*  USER PROFILE  */}
          <Route
            path="/profile"
            render={() => {
              if (!user)
                return (
                  <Col>
                    <ProfileView />
                  </Col>
                );
            }}
          />

          <Route
            exact
            path="/users/:username"
            render={({ history }) => {
              if (!user) return <LoginView onLoggedIn={(data) => this.onLoggedIn(data)} />;
              if (movies.length === 0) return;
              return (
                <Col xs={10} lg={8}>
                  <ProfileView history={history} movies={movies} />;
                </Col>
              );
            }}
          />

          {/*  MOVIE  */}
          <Route
            path="/movies/:movieId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                    genres={genres}
                    directors={directors}
                  />
                </Col>
              );
            }}
          />

          {/* DIRECTOR */}
          <Route
            path="/directors/:directorId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} xs={10}>
                  <DirectorView
                    director={directors.find((m) => m._id === match.params.directorId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/directors"
            render={() => {
              return directors.map((m) => (
                <Col md={8} xs={10}>
                  <DirectorView director={m} />
                </Col>
              ));
            }}
          />

          {/* GENRE */}

          <Route
            path="/genres/:genreId"
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col md={8} xs={10}>
                  <GenreView
                    genre={genres.find((m) => m._id === match.params.genreId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
          <Route
            exact
            path="/genres"
            render={() => {
              return genres.map((m) => (
                <Col md={8} xs={10}>
                  <GenreView genre={m} />
                </Col>
              ));
            }}
          />
        </Row>
      </Router>
    );
  }
}

export default MainView;
