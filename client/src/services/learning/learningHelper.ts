export enum LearningItems {
  QUESTGEN = "Question generation",
  INQUIRY = "Documentation inquiry",
  ME = "My Learning",
}

export const WORDLIMIT = 1;

export enum QuestType {
  MCQ = "mcq",
  TF = "tf",
  FIB = "fib",
}
export enum QuestLang {
  VIETNAMESE = "Tiếng Việt",
  ENGLISH = "English",
  JAPAN = "日本語",
}

export const typeQuestion = [
  { id: QuestType.MCQ, name: "Multiple choice question" },
  { id: QuestType.TF, name: "True or False" },
  { id: QuestType.FIB, name: "Fill in the blanks" },
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
