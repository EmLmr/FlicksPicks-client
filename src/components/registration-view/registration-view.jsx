import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import './registration-view.scss';

const logo = require('../../public/img/logo.png');

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');

    const [usernameError, setUsernameError] = useState({});
    const [passwordError, setPasswordError] = useState({});
    const [emailError, setEmailError] = useState({});
    const [birthdayError, setBirthdayError] = useState({});

    const { handleLogin } = props;

    const handleSubmit = (e) => {
        e.preventDefault();
        let formValid = formValidation();
        if (formValid) {
            axios
                .post('https://flickspicks.herokuapp.com/users', {
                    Username: username,
                    Password: password,
                    Email: email,
                    Birthday: birthday,
                })
                .then((response) => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
                })
                .catch((e) => {
                    console.log('Error registering the user. Please try again.');
                });
        }
    };

    const formValidation = () => {
        let usernameError = {};
        let passwordError = {};
        let emailError = {};
        let birthdayError = {};
        let isValid = true;

        if (username.trim().length < 4) {
            usernameError.usernameShort = 'Username is too short. Use at least 4 characters.';
            isValid = false;
        }
        if (password.trim().length < 8) {
            passwordError.passwordMissing = 'Password is too short. Use at least 8 characters.';
            isValid = false;
        }
        if (!(email && email.includes('.') && email.includes('@'))) {
            emailError.emailNotEmail = 'Email address must contain @ and . : xxx@xxx.xxx';
            isValid = false;
        }
        if (birthday === '') {
            birthdayError.birthdayEmpty = 'Please enter your date of birth.';
            isValid = false;
        }
        setUsernameError(usernameError);
        setPasswordError(passwordError);
        setEmailError(emailError);
        setBirthdayError(birthdayError);
        return isValid;
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
                        {Object.keys(usernameError).map((key) => {
                            return <div key={key}>{usernameError[key]}</div>;
                        })}
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        {Object.keys(passwordError).map((key) => {
                            return <div key={key}>{passwordError[key]}</div>;
                        })}
                    </Form.Group>

                    <Form.Group controlId="formEmail">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        {Object.keys(emailError).map((key) => {
                            return <div key={key}>{emailError[key]}</div>;
                        })}
                    </Form.Group>

                    <Form.Group controlId="formBirthday">
                        <Form.Label>Birth date:</Form.Label>
                        <Form.Control type="date" value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                        {Object.keys(birthdayError).map((key) => {
                            return <div key={key}>{birthdayError[key]}</div>;
                        })}
                    </Form.Group>
                </Col>
            </Row>
            <Row>
                <Col className="text-center">
                    <Button type="submit" size="lg" bsPrefix="submit-btn" Row={8} onClick={handleSubmit}>
                        Register
                    </Button>
                </Col>
            </Row>
            <Row className="redirect-row">
                <Col className="text-center">
                    <div>
                        To login,
                        <Button className="text-center" variant="link" type="submit" onClick={handleLogin}>
                            click here
                        </Button>
                    </div>
                </Col>
            </Row>
        </Form>
    );
}

RegistrationView.propTypes = {
    register: PropTypes.shape({
        Username: PropTypes.string.isRequired,
        Password: PropTypes.string.isRequired,
        Email: PropTypes.string.isRequired,
        Birthday: PropTypes.string.isRequired,
    }),
    onRegistration: PropTypes.func.isRequired,
};
