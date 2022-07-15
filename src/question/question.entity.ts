import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import { ModuleEntity } from "../module/module.entity";
import { QuestionInterface } from "../types";

@Entity()
export class QuestionEntity extends BaseEntity implements QuestionInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @ManyToOne(type => ModuleEntity, entity => entity.module)
  @JoinColumn()
  module: ModuleEntity;

  @Column({
    length: 300
  })
  question: string;

  @Column({
    length: 300,
  })
  correctAnswer: string;

  @Column({
    length: 300,
    nullable: true,
    default: null
  })
  badAnswer1: string | null;

  @Column({
    length: 300,
    nullable: true,
    default: null
  })
  badAnswer2: string | null;

  @Column({
    length: 300,
    nullable: true,
    default: null
  })
  badAnswer3: string | null;
}
