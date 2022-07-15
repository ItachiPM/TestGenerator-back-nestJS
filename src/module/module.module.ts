import { forwardRef, Module } from "@nestjs/common";
import { ModuleService } from './module.service';
import { ModuleController } from './module.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ModuleEntity } from "./module.entity";
import { QuestionModule } from "../question/question.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([ModuleEntity]),
    forwardRef(() => QuestionModule)
  ],
  providers: [ModuleService],
  controllers: [ModuleController],
  exports: [ModuleService],
})
export class ModuleModule {}
