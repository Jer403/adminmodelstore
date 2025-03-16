import axios from "./axios.ts";

export const createProductRequest = async (formData: FormData) => {
  return await axios.post(`/product`, formData);
};

export const getAllProductsRequest = async () => {
  return await axios.get(`/product`);
};

export const getUsersRequest = async () => {
  return await axios.get(`/users`);
};

export const getPaymentsRequest = async () => {
  return await axios.get(`/paymentsall`);
};

export const getPurchasesRequest = async () => {
  return await axios.post(`/purchases`);
};

export const editRequest = async ({
  id,
  title,
  description,
  price,
}: {
  id: string;
  title: string;
  description: string;
  price: number;
}) => {
  return await axios.post(`/product/update`, { id, title, description, price });
};
