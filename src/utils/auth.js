import { baseUrl } from "./constants";
import { checkResponse } from "./api";

//  Check these for correct object keys

export const register = ({ username, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    body: JSON.stringify({ username, email, password }),
    headers: {
      "Content-type": "application/json",
    },
  }).then(checkResponse);
};

export const login = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
    headers: {
      "Content-type": "application/json",
    },
  }).then(checkResponse);
};

//  Will the function below pull all search data?

export const getUserInfo = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
