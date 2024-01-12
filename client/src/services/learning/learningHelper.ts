export enum LearningItems {
  QUESTGEN = "Question generation",
  INQUIRY = "Documentation inquiry",
}

export const WORDLIMIT = 1;

export enum QuestType {
  MCQ = "mcq",
  TF = "tf",
  FIB = "fib",
}
export enum QuestLevel {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

export const typeQuestion = [
  { id: QuestType.MCQ, name: "Multiple choice question" },
  { id: QuestType.TF, name: "True or False" },
  { id: QuestType.FIB, name: "Fill in the blanks" },
];
export const levelQuestion = [
  { id: QuestLevel.EASY, name: "Easy" },
  { id: QuestLevel.MEDIUM, name: "Medium" },
  { id: QuestLevel.HARD, name: "Hard" },
];
