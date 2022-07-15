import { Controller, Get, Inject, Param, ParseIntPipe } from "@nestjs/common";
import { TestQuestionsResponse } from "../types";
import { ExamService } from "./exam.service";

@Controller('test')
export class ExamController {

  constructor(
    @Inject(ExamService) private examService: ExamService,
  ) {}

  @Get('/general')
  createGeneralExam(): Promise<TestQuestionsResponse[]> {
    return this.examService.createGeneralExam();
  }

  @Get('/module/:moduleId/:questionsCount')
  createExamFromModule(
    @Param('moduleId') moduleId: string,
    @Param('questionsCount', ParseIntPipe) questionsCount: number,
  ) {
    return this.examService.createExamFromModule(moduleId, questionsCount)
  }

}
