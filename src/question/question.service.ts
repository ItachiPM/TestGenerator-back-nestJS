import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { AddQuestionDto } from "./dto/add-question.dto";
import { ModuleEntity } from "../module/module.entity";
import { ModuleService } from "../module/module.service";
import { QuestionEntity } from "./question.entity";
import { QuestionAndAnswerDto } from "./dto/question-and-answer.dto";
import { QuestionForAdmin } from "../types";
import { Like } from "typeorm";

@Injectable()
export class QuestionService {

  constructor(
    @Inject(forwardRef(() => ModuleService)) private moduleService: ModuleService,
  ) {}

  async insert(reqQuestion: AddQuestionDto): Promise<AddQuestionDto> {

    const {id, module, question, badAnswer2, badAnswer3, correctAnswer, badAnswer1} = reqQuestion

    if(id) {
      throw new Error('Cannot insert something that is already inserted.')
    }

    const isNewModule = await ModuleEntity.findOne({
      where: { module }
    })

    if(isNewModule === null) {
      await this.moduleService.addModule(module)
    }

    const newModule = await ModuleEntity.findOne({
      where: { module }
    })

    const newQuestion = new QuestionEntity()

    newQuestion.module = isNewModule=== null ? newModule : isNewModule;
    newQuestion.question = question;
    newQuestion.correctAnswer = correctAnswer;
    newQuestion.badAnswer1 = badAnswer1;
    newQuestion.badAnswer2 = badAnswer2;
    newQuestion.badAnswer3 = badAnswer3;

    await newQuestion.save()

    return {
      id: newQuestion.id,
      module: newQuestion.module.module,
      question: newQuestion.question,
      correctAnswer: newQuestion.correctAnswer,
      badAnswer1: newQuestion.badAnswer1,
      badAnswer2: newQuestion.badAnswer2,
      badAnswer3: newQuestion.badAnswer3,
    }
  }

  async getQuestionAndAnswer(): Promise<QuestionAndAnswerDto[]> {
    const questions = await QuestionEntity.find({
      select: {id: true, question: true, correctAnswer: true, module: {module: true}},
      relations: ['module']
    });

    return questions.map(obj => ({
      id: obj.id,
      question: obj.question,
      answer: obj.correctAnswer,
      module: obj.module.module
    })
    );
  }

  async getAllQuestionFromModule(searchModule: string): Promise<QuestionAndAnswerDto[]> {
    const module = await ModuleEntity.findOne({
      where: {module: searchModule}
    })

    if(module === null) {
      throw new Error('nie ma takiego modułu')
    }

    const questions = await QuestionEntity.find({
      select: {id: true, question: true, correctAnswer: true, module: {module: true}},
      where: {module: {module: searchModule}},
      relations: ['module']
    });

    return questions.map(obj => ({
        id: obj.id,
        question: obj.question,
        answer: obj.correctAnswer,
        module: obj.module.module
      })
    );
  }

  async getOne(id: string): Promise<QuestionEntity> {
    return await QuestionEntity.findOne({where: {
        id
      }})

  }

  async searchAll(): Promise<QuestionForAdmin[]> {
    return await QuestionEntity.find()
  }

  async search(content: string): Promise<QuestionForAdmin[]> {
    return await QuestionEntity.find({
      where: [
        {question: Like(`%${content}%`)},
        {correctAnswer: Like(`%${content}%`)}
      ],

    })
  }

  async delete(id: string) {
    const question = await QuestionEntity.findOne({
      where: {id}
    })

    if(!question) {
      throw new Error('Użytkownik o takim ID nie istnieje.')
    }

    await QuestionEntity.delete({id})
  }
}
