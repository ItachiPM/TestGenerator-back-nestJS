import {Answer} from "../types"

export const shuffleAnswers = (answers: Answer[]) => {
  for (let i = 0; i <= answers.length - 1; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [answers[i], answers[j]] = [answers[j], answers[i]];
  }
}
