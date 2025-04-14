import axios from "./axios.ts";

let lastRecord = { uploaded: 0, time: 0 };

export const createProductRequest = async (
  formData: FormData,
  setProgress?: React.Dispatch<React.SetStateAction<number>>,
  setSpeed?: React.Dispatch<React.SetStateAction<number>>,
  setTime?: React.Dispatch<React.SetStateAction<number>>
) => {
  const res = await axios.post(`/product`, formData, {
    onUploadProgress: (progressEvent) => {
      const uploaded = progressEvent.loaded;
      const total = progressEvent.total
        ? progressEvent.total
        : progressEvent.loaded;
      const actualTime = new Date().getTime();

      const percentCompleted = Math.round((uploaded * 100) / total);

      const timePassed = (actualTime - lastRecord.time) / 1000;
      const bitesUploaded = uploaded - lastRecord.uploaded;

      const speed = bitesUploaded / timePassed;

      const rest = Math.floor(total - uploaded);

      const estimatedTime = rest / speed;
      lastRecord.uploaded = uploaded;
      lastRecord.time = actualTime;

      if (setProgress) setProgress(percentCompleted);
      if (setSpeed) setSpeed(speed);
      if (setTime) setTime(estimatedTime);
    },
  });
  lastRecord = { uploaded: 0, time: 0 };
  return res;
};

export const getAllProductsRequest = async () => {
  return await axios.get(`/productswd`);
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
  personal,
  professional,
  driveId,
  weight,
}: {
  id: string;
  title: string;
  description: string;
  personal: number;
  professional: number;
  driveId: string;
  weight: number;
}) => {
  return await axios.post(`/product/update`, {
    id,
    title,
    description,
    personal,
    professional,
    driveUrl: driveId,
    weight,
  });
};
