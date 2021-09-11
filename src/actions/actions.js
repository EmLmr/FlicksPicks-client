// ACTIONS
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
export const SET_USER = "SET_USER";
export const UPDATE_USER = "UPDATE_USER";

// ACTION CREATORS
export function setMovies(movies) {
  return {
    type: SET_MOVIES,
    movies,
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

export function updateUser(user) {
  return {
    type: UPDATE_USER,
    user,
  };
}
