import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import './login-view.scss';

const logo = require('../../public/img/logo.png');

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const { handleRegister } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        /* Send a request to the server for authentication */
        axios
            .post('https://flickspicks.herokuapp.com/login', {
                Username: username,
                Password: password,
            })
            .then((response) => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch((e) => {
                alert('Invalid username or password!');
            });
    };

    return (
        <Form>
            <Row className="logo justify-content-center">
                <Image src={logo} fluid />
            </Row>
            <Row className="form-body justify-content-center">
                <Col xs={8} md={6}>
                    <Form.Group controlId="formUsername">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button type="submit" size="lg" bsPrefix="submit-btn" onClick={handleSubmit}>
                        Login
                    </Button>
                </Col>
            </Row>
            <Row className="redirect-row">
                <Col className="text-center">
                    <div>
                        Don't have an account yet?
                        <Button className="text-center" variant="link" type="submit" onClick={handleRegister}>
                            Sign up
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
};
