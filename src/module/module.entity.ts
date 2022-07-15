import { ModuleInterface } from "src/types";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { QuestionEntity } from "../question/question.entity";

@Entity()
export class ModuleEntity extends BaseEntity implements ModuleInterface {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({
    length: 50
  })
  module: string;

  @OneToMany(type => QuestionEntity, entity => entity.module)
  question: QuestionEntity;

}
