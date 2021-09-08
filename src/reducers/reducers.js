import { combineReducers } from "redux";

// import all actions
import {
  SET_MOVIES,
  SET_FILTER,
  SET_GENRES,
  SET_DIRECTORS,
  SET_USER,
  UPDATE_USER,
  UPDATE_FAVORITES,
} from "../actions/actions";

// reducer to update the movies when the action is dispatched
function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.movies;
    default:
      return state;
  }
}

// reducer to enable filtering when the action is dispatched
function visibilityFilter(state = "", action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

// reducer to update the genres when the action is dispatched
function genres(state = [], action) {
  switch (action.type) {
    case SET_GENRES:
      return action.genres;
    default:
      return state;
  }
}

// reducer to update the directors when the action is dispatched
function directors(state = [], action) {
  switch (action.type) {
    case SET_DIRECTORS:
      return action.directors;
    default:
      return state;
  }
}

// reducer to update the user state when one of the actions is dispatched
function user(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.user;

    case UPDATE_USER:
      return action.userData;

    case UPDATE_FAVORITES:
      return action.favoriteMovies;

    default:
      return state;
  }
}

// combined reducer that handles all state updates, for the whole app
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  genres,
  directors,
  user,
  userData,
  favoriteMovies,
});

export default moviesApp;
