export interface EvaluationCreateText {
  question: string;
  context: string;
  markingCriteria: string;
}
export interface EvaluationCreateFile {
  question: string;
  file: File;
  markingCriteria: string;
}
export interface EvaluationResponse {
  score: number;
  comment: string;
  advice: string;
}
