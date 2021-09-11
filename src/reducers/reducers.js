import { combineReducers } from "redux";

// import all actions
import { SET_MOVIES, SET_FILTER, SET_USER, UPDATE_USER } from "../actions/actions";

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

// reducer to update the user state when one of the actions is dispatched
function user(state = [], action) {
  switch (action.type) {
    case SET_USER:
      return action.user;

    case UPDATE_USER:
      return action.user;

    default:
      return state;
  }
}

// combined reducer that handles all state updates, for the whole app
const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user,
});

export default moviesApp;
