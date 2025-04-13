import axios from "./axios.ts";

export const deleteUserRequest = async (id: string) => {
  return await axios.post(`/user/delete`, { id });
};
