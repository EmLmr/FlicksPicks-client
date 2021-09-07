// ACTIONS
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";
export const UPDATE_FAVORITES = "UPDATE_FAVORITES";
// set genres
// set directors

// ACTION CREATORS
export function setMovies(movieArray) {
  return {
    type: SET_MOVIES,
    movieArray,
  };
}

export function setFilter(value) {
  return {
    type: SET_FILTER,
    value,
  };
}

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

export function updateUser(userData) {
  return {
    type: UPDATE_USER,
    userData,
  };
}

export function updateFavorites(favoriteMovie) {
  return {
    type: UPDATE_FAVORITES,
    favoriteMovie,
  };
}
