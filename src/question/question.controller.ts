import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { QuestionService } from "./question.service";
import { AddQuestionDto } from "./dto/add-question.dto";
import { QuestionAndAnswerDto } from "./dto/question-and-answer.dto";
import { QuestionForAdmin } from "../types";

@Controller('question')
export class QuestionController {

  constructor(
    @Inject(QuestionService) private questionService: QuestionService,
  ) {}


  @Get('/search/:content')
  async search(
    @Param('content') content: string
  ): Promise<QuestionForAdmin[]> {
    return this.questionService.search(content)
  }

  @Get('/search')
  async searchAll(): Promise<QuestionForAdmin[]> {
    return this.questionService.searchAll()
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string
  ) {
    return this.questionService.delete(id)
  }

  @Get('/')
  async getAllQuestion(): Promise<QuestionAndAnswerDto[]> {
    return this.questionService.getQuestionAndAnswer();
  }

  @Get('/:searchModule')
  async getAllQuestionFromModule(
    @Param('searchModule') searchModule: string,
  ): Promise<QuestionAndAnswerDto[]> {
    return this.questionService.getAllQuestionFromModule(searchModule);
  }

  @Post('/add')
  async insertQuestion(
    @Body() reqQuestion: AddQuestionDto,
  ): Promise<AddQuestionDto> {
    return this.questionService.insert(reqQuestion);
  }
}
