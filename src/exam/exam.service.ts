import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { TestQuestionsResponse } from 'src/types';
import { ModuleService } from "../module/module.service";
import {v4 as uuid} from 'uuid'
import { shuffleAnswers } from "../utils/schuffleAnswers";
import { QuestionEntity } from "../question/question.entity";
import { DataSource } from "typeorm";

@Injectable()
export class ExamService {

  constructor(
    @Inject(forwardRef(() => ModuleService)) private moduleService: ModuleService,
    @Inject(DataSource) private dataSource: DataSource,
  ) {}

  async createGeneralExam(): Promise<TestQuestionsResponse[]> {

    const modules = await this.moduleService.getAllModules();

    const questionsList: TestQuestionsResponse[] = [];

    for (const module of modules) {
      const questions = await this.dataSource
        .createQueryBuilder()
        .from(QuestionEntity, 'questionEntity')
        .where('moduleId = :moduleId', {moduleId: module.id})
        .orderBy('RAND()')
        .limit(2)
        .getRawMany()

      questions.map(question => ({
        id: question.id,
        question: question.question,
        answers: [
          {
            id: uuid(),
            answer: question.correctAnswer,
            points: 1,
          },
          {
            id: uuid(),
            answer: question.badAnswer1,
            points: 0,
          },
          {
            id: uuid(),
            answer: question.badAnswer2,
            points: 0,
          },
          {
            id: uuid(),
            answer: question.badAnswer3,
            points: 0,
          }
        ],
      }))
        .forEach(obj => questionsList.push(obj))
    }

    questionsList.map(questions => shuffleAnswers(questions.answers))

    return questionsList
  }

  async createExamFromModule(moduleId: string, questionsCount: number): Promise<TestQuestionsResponse[]> {

    const questionsList: TestQuestionsResponse[] = [];

      const questions = await this.dataSource
        .createQueryBuilder()
        .from(QuestionEntity, 'questionEntity')
        .where('moduleId = :moduleId', {moduleId})
        .orderBy('RAND()')
        .limit(questionsCount)
        .getRawMany()

      questions.map(question => ({
        id: question.id,
        question: question.question,
        answers: [
          {
            id: uuid(),
            answer: question.correctAnswer,
            points: 1,
          },
          {
            id: uuid(),
            answer: question.badAnswer1,
            points: 0,
          },
          {
            id: uuid(),
            answer: question.badAnswer2,
            points: 0,
          },
          {
            id: uuid(),
            answer: question.badAnswer3,
            points: 0,
          }
        ],
      }))
        .forEach(obj => questionsList.push(obj))

    questionsList.map(questions => shuffleAnswers(questions.answers))

    return questionsList
  }
}
