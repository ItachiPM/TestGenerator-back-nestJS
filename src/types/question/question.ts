import { ModuleEntity } from "../../module/module.entity";

export interface QuestionInterface {
  id: string;
  module: ModuleEntity;
  question: string;
  correctAnswer: string;
  badAnswer1: string | null;
  badAnswer2: string | null;
  badAnswer3: string | null;
}

export interface AddQuestion {
  id?:string;
  module: string;
  question: string;
  correctAnswer: string;
  badAnswer1: string | null;
  badAnswer2: string | null;
  badAnswer3: string | null;
}

export interface QuestionForAdmin {
  id: string;
  module: ModuleEntity;
  question: string;
  correctAnswer: string;
  badAnswer1: string | null;
  badAnswer2: string | null;
  badAnswer3: string | null;
}

export interface QuestionAndAnswer {
  id: string;
  question: string;
  answer: string;
  module: string;
}
