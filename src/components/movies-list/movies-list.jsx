import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';

const mapStateToProps = (state) => {
    const { visibilityFilter } = state;
    return { visibilityFilter };
};

function MoviesList(props) {
    const { movies, visibilityFilter } = props;
    let filteredMovies = movies;

    if (visibilityFilter !== '') {
        filteredMovies = movies.filter((m) => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
    }

    if (!movies) return <div className="main-view" />;

    return (
        <>
            <Col md={8} style={{ margin: '1em' }}>
                <VisibilityFilterInput visibilityFilter={visibilityFilter} />
            </Col>
            {filteredMovies.map((m) => (
                <Col sm={12} md={6} xl={4} className="d-flex justify-content-center" key={m._id}>
                    <MovieCard movie={m} />
                </Col>
            ))}
        </>
    );

    // return filteredMovies.map((m) => (

    //   // <Col sm={12} md={6} xl={4} key={m._id}>
    //   //   <MovieCard movie={m} />
    //   // </Col>
    // ));
}

export default connect(mapStateToProps)(MoviesList);
