import ky from "ky";
import { useAppStore } from "../store/auth.store";

export const getProducts = async (data) => {
  return ky
    .post(import.meta.env.VITE_BACKEND_URL + "/api/app/products", {
      json: data,
    })
    .json();
};

export const getSingleProduct = async (productId) => {
  return ky
    .get(import.meta.env.VITE_BACKEND_URL + `/api/app/products/${productId}`)
    .json();
};

export const getFeaturedProducts = async () => {
  return ky
    .get(import.meta.env.VITE_BACKEND_URL + `/api/app/product/featured`)
    .json();
};

export const getLatestProducts = async () => {
  return ky
    .get(import.meta.env.VITE_BACKEND_URL + `/api/app/product/new-arrival`)
    .json();
};

export const postProduct = async (data) => {
  return ky
    .post(import.meta.env.VITE_BACKEND_URL + "/api/app/product", {
      body: data,
    })
    .json();
};

export const addToCart = async (data) => {
  const token = useAppStore.getState().token;
  return ky
    .post(import.meta.env.VITE_BACKEND_URL + "/api/app/cart/add", {
      json: data,
      headers: {
        Authorization: token,
      },
    })
    .json();
};
