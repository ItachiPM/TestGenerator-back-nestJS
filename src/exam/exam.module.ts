import { forwardRef, Module } from "@nestjs/common";
import { ExamController } from './exam.controller';
import { ExamService } from './exam.service';
import { ModuleModule } from "../module/module.module";
import { QuestionModule } from "../question/question.module";

@Module({
  imports: [
    forwardRef(() => ModuleModule),
    forwardRef(() => QuestionModule),
  ],
  controllers: [ExamController],
  providers: [ExamService],
})
export class ExamModule {}
