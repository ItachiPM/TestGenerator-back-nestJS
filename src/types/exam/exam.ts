export interface TestQuestionsResponse {
  id: string;
  question: string;
  answers: Answer[];
}

export type Answer = {
  id: string;
  answer: string;
  points: number;
}
