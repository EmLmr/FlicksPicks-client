import React from "react";
import PropTypes from "prop-types";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <Row>
          <Col>
            <Button
              variant="dark"
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
          </Col>
        </Row>
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
              <span className="value">{movie.Genre}</span>
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
              <span className="value">{movie.Director}</span>
            </div>
            <div className="movie-actors">
              <span className="label">
                <h3>Cast:</h3>
              </span>
              <span className="value">{movie.Actors.join(", ")}</span>
            </div>
          </Col>
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
    Genre: PropTypes.shape({
      Gname: PropTypes.string.isRequired,
    }),
    Description: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
    }),
    Actors: PropTypes.array.isRequired,
  }),
};
