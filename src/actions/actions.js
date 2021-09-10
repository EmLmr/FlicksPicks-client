// ACTIONS
export const SET_MOVIES = "SET_MOVIES";
export const SET_FILTER = "SET_FILTER";
// export const SET_GENRES = "SET_GENRES";
// export const SET_DIRECTORS = "SET_DIRECTORS";
export const SET_USER = "SET_USER";
// export const UPDATE_USER = "UPDATE_USER";
// export const UPDATE_FAVORITES = "UPDATE_FAVORITES";

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

// export function setGenres(genres) {
//   return {
//     type: SET_GENRES,
//     genres,
//   };
// }

// export function setDirectors(directors) {
//   return {
//     type: SET_DIRECTORS,
//     directors,
//   };
// }

export function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

// export function updateUser(userData) {
//   return {
//     type: UPDATE_USER,
//     user,
//   };
// }

// export function updateFavorites(favoriteMovies) {
//   return {
//     type: UPDATE_FAVORITES,
//     favoriteMovies,
//   };
// }
