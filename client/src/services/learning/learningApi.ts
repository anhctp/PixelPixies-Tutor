import { create } from "zustand";
import axios from "axios";
import { ChatConversation, GenQuest, UploadText } from "./learningHelper";
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8000";
const token =
  typeof window !== "undefined" ? localStorage.getItem("token") : "";
export const uploadFilePdf = (file: File) => {
  return axios.post(
    "/PDF/upload",
    { pdf: file },
    {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const uploadTextGenquest = (text: UploadText) => {
  return axios.post("/PDF/upload/text", text, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const genQuest = (payload: GenQuest) => {
  return axios.post("PDF/pdf_to_text/", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getListQuest = () => {
  return axios.get("question", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const deleteListQuest = (listId: number) => {
  return axios.delete(`question/${listId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getQuestByListId = (listId: number) => {
  return axios.get(`question/list/${listId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const createChatWithText = (context: string) => {
  return axios.post(
    "/conversation/chat-with-text",
    { user_input: context },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const createChatWithFile = (file: File) => {
  return axios.post(
    "/conversation/chat-with-text",
    { file: file },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
export const chatConversation = (payload: ChatConversation) => {
  return axios.post("/conversation/chat", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getChatConversationById = (id: number) => {
  return axios.get(`/conversation/chat/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
