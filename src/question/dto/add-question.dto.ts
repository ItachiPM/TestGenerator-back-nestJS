import { AddQuestion } from "../../types";
import { IsOptional, IsString, MinLength } from "class-validator";

export class AddQuestionDto implements AddQuestion {
  id?:string;

  @IsString()
  @MinLength(1, {
    message: "musisz podać treść pytania"
  })
  module: string;

  @MinLength(1, {
    message: "musisz podać treść pytania"
  })
  @IsString({
    message: 'to musi być string'
  })
  question: string;

  @IsString()
  @MinLength(1, {
    message: "musisz podać treść pytania"
  })
  correctAnswer: string;

  @IsOptional()
  badAnswer1: string | null;
  @IsOptional()
  badAnswer2: string | null;
  @IsOptional()
  badAnswer3: string | null;
}
