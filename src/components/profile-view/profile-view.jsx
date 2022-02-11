import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import { Button, Card, Form, Row, Col, CardGroup } from 'react-bootstrap';

import { setUser, updateUser } from '../../actions/actions';

import './profile-view.scss';

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
        const accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.getUser(accessToken);
        }
    }

    // get user
    getUser(token) {
        const username = localStorage.getItem('user');
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

    removeFavorite(movie) {
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios
            .delete(`https://flickspicks.herokuapp.com/users/${username}/movies/${movie._id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                alert(`"${movie.Title}" has been removed from your favorite movies.`);
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    updateProfile(e, newUsername, newPassword, newEmail, newBirthday) {
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
        e.preventDefault();

        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios
            .put(`https://flickspicks.herokuapp.com/users/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
                data: {
                    Username: newUsername ? newUsername : this.state.Username,
                    Password: newPassword ? newPassword : this.state.Password,
                    Email: newEmail ? newEmail : this.state.Email,
                    Birthday: newBirthday ? newBirthday : this.state.Birthday,
                },
            })
            .then((response) => {
                alert('User profile successfully updated.');
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday,
                });
                localStorage.setItem('user', this.state.Username);
                window.open(`/users/${username}`, '_self');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setUsername(input) {
        this.Username = input;
    }
    setPassword(input) {
        this.Password = input;
    }
    setEmail(input) {
        this.Email = input;
    }
    setBirthday(input) {
        this.Birthday = input;
    }

    deleteProfile(e) {
        e.preventDefault();
        if (!confirm('Are you sure you want to delete your account? This is irreversible!')) return;
        const token = localStorage.getItem('token');
        const username = localStorage.getItem('user');

        axios
            .delete(`https://flickspicks.herokuapp.com/users/${username}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => {
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                alert('Your account has been deleted.');
                window.open(`/`, '_self');
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
                {/*USER INFO */}
                <Form noValidate validated={validated} className="update-form">
                    <Row className="update-profile">
                        <Col>
                            <h1>Update profile:</h1>
                            <Form.Group controlId="formBasicUsername">
                                <Form.Label controlId="username" className="form-label" label="Username">
                                    Username:
                                </Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder={this.state.Username}
                                    onChange={(e) => this.setUsername(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label controlId="username" className="form-label" label="Password">
                                    Password:<span className="required">*</span>
                                </Form.Label>
                                <Form.Control type="password" onChange={(e) => this.setPassword(e.target.value)} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label controlId="username" className="form-label" label="Email">
                                    Email:
                                </Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder={this.state.Email}
                                    onChange={(e) => this.setEmail(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group controlId="formBasicBirthday">
                                <Form.Label controlId="username" className="form-label" label="Birthday">
                                    Birthday:
                                </Form.Label>
                                <Form.Control
                                    type="date"
                                    placeholder={this.state.Birthday}
                                    onChange={(e) => this.setBirthday(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Form>

                <Row className="justify-content-center">
                    <Button
                        variant="danger"
                        type="submit"
                        onClick={
                            (e, newUsername, newPassword, newEmail, newBirthday) =>
                                this.updateProfile(
                                    e,
                                    this.newUsername,
                                    this.newPassword,
                                    this.newEmail,
                                    this.newBirthday
                                )
                            /* (e) => this.updateProfile(e, this.Username, this.Password, this.Email, this.Birthday)} */
                        }
                    >
                        Update
                    </Button>
                </Row>

                {/* DELETE USER */}
                <Row>
                    <Col className="delete-profile">
                        <h3>Delete account?</h3>
                        <Button variant="danger" onClick={(e) => this.deleteProfile(e)}>
                            Delete Account
                        </Button>
                    </Col>
                </Row>

                {/* FAVORITE MOVIES*/}
                <Row>
                    <Col className="favorite-movies">
                        <h1 className="favorites-list">Your favorite movies:</h1>
                        <CardGroup>
                            {FavoriteMovies.length === 0 && <div className="text-center">No favorites yet :(</div>}

                            {FavoriteMovies.length > 0 &&
                                movies.map((movie) => {
                                    if (movie._id === FavoriteMovies.find((favMovie) => favMovie === movie._id)) {
                                        return (
                                            <Card className="favorites-item card-content" key={movie._id} bg="dark">
                                                <Card.Img
                                                    className="movie-poster"
                                                    variant="top"
                                                    crossOrigin="anonymous"
                                                    src={movie.ImageURL}
                                                />
                                                <Card.Body>
                                                    <Card.Title className="card-title">{movie.Title}</Card.Title>
                                                    <Button
                                                        size="sm"
                                                        className="profile-button remove-favorite"
                                                        variant="danger"
                                                        value={movie._id}
                                                        onClick={() => this.removeFavorite(movie)}
                                                    >
                                                        Remove
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                        );
                                    }
                                })}
                        </CardGroup>
                    </Col>
                </Row>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        user: state.user,
        movies: state.movies,
    };
};

export default connect(mapStateToProps, { setUser, updateUser })(ProfileView);
