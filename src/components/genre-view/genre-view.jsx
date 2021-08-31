import React from "react";
import propTypes from "prop-types";
import Button from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="genre-view">
        <div className="genre-name">
          <h1>
            <span className="value">{movie.Genre.Gname}</span>
          </h1>
        </div>
        <div className="genre-description">
          <span className="value">{movie.Genre.Gdescription}</span>
        </div>

        <Button
          variant="primary"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

GenreView.propTypes = {
  genre: propTypes.shape({
    Gname: propTypes.string.isRequired,
    Gdescription: propTypes.string.isRequired,
  }).isRequired,
};

export default GenreView;
