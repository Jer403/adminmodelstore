import axios from "./axios.ts";

export const getAllBeneficiarysRequest = async () => {
  return await axios.get(`/beneficiaries`);
};

export const deleteBeneficiaryRequest = async ({ id }: { id: string }) => {
  return await axios.post(`/beneficiary/delete`, { id });
};

export const payBeneficiaryRequest = async ({ id }: { id: string }) => {
  return await axios.post(`/beneficiary/pay`, { id });
};

export const createBeneficiarysRequest = async ({
  name,
  ratingBeforeMax,
  ratingAfterMax,
  max,
}: {
  name: string;
  ratingBeforeMax: number;
  ratingAfterMax: number;
  max: number;
}) => {
  return await axios.post(`/beneficiary/create`, {
    name,
    ratingBeforeMax,
    ratingAfterMax,
    max,
  });
};
