export interface EvaluationCreate {
  question: string;
  answer: string | File;
  markingCriteria: string;
}
