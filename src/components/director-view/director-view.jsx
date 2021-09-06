import React from "react";
import propTypes from "prop-types";

import Button from "react-bootstrap/Button";
import { Row, Col } from "react-bootstrap";

import "../director-view/director-view.scss";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;

    return (
      <div className="director-view">
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
          <div className="director-name">
            <span className="value">
              <h1>{director.Name}</h1>
            </span>
          </div>
        </Row>
        <Row>
          <div className="director-bio">
            <span className="label">
              <h2>Bio:</h2>
            </span>
            <span className="value">{director.Bio}</span>
          </div>
        </Row>
        <Row>
          <div className="director-born">
            <span className="value">Born: {director.Born}</span>
          </div>
        </Row>
        <Row>
          <div className="director-born">
            <span className="value">Died: {director.Died}</span>
          </div>
        </Row>
      </div>
    );
  }
}

DirectorView.propTypes = {
  director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Born: propTypes.string.isRequired,
    Died: propTypes.string,
  }).isRequired,
};
