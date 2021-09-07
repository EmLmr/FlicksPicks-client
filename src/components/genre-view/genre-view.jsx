import React from "react";
import propTypes from "prop-types";

import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

import "../genre-view/genre-view.scss";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <div className="genre-view">
        {/* <Row>
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
        </Row> */}
        <Row>
          <div className="genre-name">
            <span className="value">
              <h1>{genre.Gname}</h1>
            </span>
          </div>
        </Row>
        <Row>
          <div className="genre-description">
            <span className="value">{genre.Gdescription}</span>
          </div>
        </Row>
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
