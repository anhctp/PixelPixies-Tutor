export enum LearningItems {
  QUESTGEN = "Question generation",
  INQUIRY = "Documentation inquiry",
  ME = "My Learning",
}

export const WORDLIMIT = 300;

export enum QuestType {
  MCQ = "Multiple choice Question",
  TF = "True False Question",
}
export enum QuestLang {
  VIETNAMESE = "Tiếng Việt",
  ENGLISH = "English",
  JAPAN = "日本語",
}

export const typeQuestion = [
  { id: QuestType.MCQ, name: "Multiple choice question" },
  { id: QuestType.TF, name: "True or False" },
];
export const langQuestion = [
  { id: QuestLang.VIETNAMESE, name: "Vietnamese" },
  { id: QuestLang.ENGLISH, name: "English" },
  { id: QuestLang.JAPAN, name: "Japan" },
];

export interface Message {
  id: number;
  content: string;
  sender: "user" | "bot";
}
export interface IChatGPTPayload {
  prompt: string;
}

export const headers = ["ID", "Name", "Actions"];

export const data = [
  {
    id: 1,
    name: "askjdaksd",
  },
  {
    id: 2,
    name: "askjaksd",
  },
];

export interface GenQuest {
  pdf_id: number;
  type: string;
  language: string;
  num_easy: number;
  num_medium: number;
  num_hard: number;
}

export enum QuestLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export interface UploadText {
  text: string;
}
