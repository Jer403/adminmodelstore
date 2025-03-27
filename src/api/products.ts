import axios from "./axios.ts";

export const createProductRequest = async (
  formData: FormData,
  setter?: React.Dispatch<React.SetStateAction<number>>
) => {
  return await axios.post(`/product`, formData, {
    onUploadProgress: (progressEvent) => {
      const percentCompleted = Math.round(
        (progressEvent.loaded * 100) /
          (progressEvent.total ? progressEvent.total : 1)
      );
      console.log(`Progreso de subida: ${percentCompleted}%`);
      if (setter) setter(percentCompleted);
    },
  });
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
