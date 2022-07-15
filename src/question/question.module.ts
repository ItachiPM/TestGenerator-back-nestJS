import { forwardRef, Module } from "@nestjs/common";
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionEntity } from "./question.entity";
import { ModuleModule } from "../module/module.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity]),
    forwardRef(() => ModuleModule)
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService]
})
export class QuestionModule {}
