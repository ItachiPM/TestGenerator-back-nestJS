import { QuestionAndAnswer } from "../../types";
import { IsString, IsUUID } from "class-validator";

export class QuestionAndAnswerDto implements QuestionAndAnswer{
  @IsUUID()
  id: string;

  @IsString()
  question: string;
  @IsString()
  answer: string;
  @IsString()
  module: string;
}
