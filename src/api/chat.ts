import axios from "./axios.ts";

export const sendMessageRequest = async (id: string, message: string) => {
  return await axios.post(`/message/adm/create`, { id, message });
};

export const getMessagesRequest = async () => {
  return await axios.get(`/messages`);
};

export const getChatsRequest = async () => {
  return await axios.get(`/chats`);
};
