import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";

import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;

    return (
      <Card>
        <Card.Img />
        <Card.Body>
          <Card.Title className="card-title">
            <h1>{movie.Title}</h1>
          </Card.Title>
          <div>
            <Badge className="genre-badge">genre</Badge>
          </div>
          <Card.Text className="card-description">{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="link">
            See more...
          </Button>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Gname: PropTypes.string.isRequired,
    }),
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired,
};
