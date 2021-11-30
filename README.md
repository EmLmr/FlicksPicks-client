# Objective

To build the server-side of a [movie API](https://github.com/EmLmr/movie_api) that I previously created.
The web application will provide users with information about different movies,
directors, and genres.
Users will also be able to sign up, update their user information, and add/remove movies to/from their list of favorite movies.

## Quick Start
To run the app locally yourself, clone the repository, and complete the following steps:

### Install dependencies
```bash
npm install
```

### Start application with npm and run in browser
_By default the app will run a local server on port: 3000_

```bash
npx parcel src/index.html
```

# Feature Requirements

- Return a list of ALL movies to the user
- Return data (description, genre, director, movie poster) about a single movie by title to the user
- Return data about a genre (description)
- Return data about a director (bio, birth year, death year)
- Allow new users to register
- Allow users to update their user info (username, password, email, date of birth)
- Allow users to add a movie to their list of favorites
- Allow users to remove a movie from their list of favorites
- Allow existing users to deregister

# Technical Requirements

The API:

- must be a Node.js and Express application,
- must use REST architecture, with URL endpoints corresponding to the data operations listed above,
- must use at least three middleware modules, such as the body-parser package for reading data from requests and morgan for logging,
- must use a “package.json” file,
- must provide movie information in JSON format,
- must be tested in Postman,
- must include user authentication and authorization code,
- must include data validation logic,
- must meet data security regulations,
- source code must be deployed to a publicly accessible platform like GitHub,
- must be deployed to Heroku.

- The database must be built using MongoDB.
- The business logic must be modeled with Mongoose.
- The JavaScript code must be error-free.

# Built with:

- JavaScript
- Node.js
- Express
- MongoDB
- Mongoose
