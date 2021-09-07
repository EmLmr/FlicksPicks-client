import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import axios from "axios";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./movie-view.scss";

export class MovieView extends React.Component {
  addFavorite() {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("user");

    axios
      .post(
        `https://flickspicks.herokuapp.com/users/${username}/movies/${this.props.movie._id}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        alert("Movie succesfully added to favorites!");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movie, genres, directors, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Row>
          <div className="movie-title">
            <span className="label"></span>
            <span className="value">
              <h1>{movie.Title}</h1>
            </span>
          </div>
        </Row>
        <Row>
          <Col md={5}>
            <div className="movie-poster">
              <img crossorigin="anonymous" src={movie.ImageURL} alt={`${movie.Title}'s movie poster`} />
            </div>
            <div className="movie-release">
              <span className="label">Released: </span>
              <span className="value">{movie.Year}</span>
            </div>
            <div className="movie-genre">
              <span className="label">Genre:</span>
              <Link to={`/genres/${movie.Genre[0]}`}>
                <Button className="link" variant="link">
                  {genres.find((g) => g._id === movie.Genre[0]).Gname}
                </Button>
              </Link>
            </div>
          </Col>
          <Col md={7}>
            <div className="movie-description">
              <span className="label">
                <h2>The story:</h2>{" "}
              </span>
              <span className="value">{movie.Description}</span>
            </div>
            <div className="movie-director">
              <span className="label">
                <h3>Directed by:</h3>{" "}
              </span>

              <Link to={`/directors/${movie.Director[0]}`}>
                <Button className="link" variant="link">
                  {directors.find((d) => d._id === movie.Director[0]).Name}
                </Button>
              </Link>
            </div>

            <div className="movie-actors">
              <span className="label">
                <h3>Cast:</h3>
              </span>
              <span className="value">{movie.Actors.join(", ")}</span>
            </div>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Button variant="danger" className="fav-button" value={movie._id} onClick={(e) => this.addFavorite(e, movie)}>
            &#9825;
          </Button>
        </Row>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Year: PropTypes.string.isRequired,
    Genre: PropTypes.array.isRequired,
    Description: PropTypes.string.isRequired,
    Director: PropTypes.array.isRequired,
    Actors: PropTypes.array.isRequired,
  }),
};
