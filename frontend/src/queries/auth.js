import ky from "ky";

export const login = async (data) => {
  return ky
    .post(import.meta.env.VITE_BACKEND_URL + "/api/auth/login", {
      json: data,
    })
    .json();
};

export const signIn = async (data) => {
  return ky
    .post(import.meta.env.VITE_BACKEND_URL + "/api/auth/sign-in", {
      json: data,
    })
    .json();
};

export const me = async (token) => {
  return ky
    .get(import.meta.env.VITE_BACKEND_URL + "/api/auth/me", {
      headers: {
        Authorization: token,
      },
    })
    .json();
};

export const incrementCart = async (token) => {
  return ky
    .get(import.meta.env.VITE_BACKEND_URL + "/api/auth/me", {
      headers: {
        Authorization: token,
      },
    })
    .json();
};
export const decrementCart = async (token) => {
  return ky
    .get(import.meta.env.VITE_BACKEND_URL + "/api/auth/me", {
      headers: {
        Authorization: token,
      },
    })
    .json();
};
