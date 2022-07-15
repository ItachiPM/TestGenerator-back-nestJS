import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UserInterface } from "../types";

@Entity()
export class UserEntity extends BaseEntity implements UserInterface {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 50,
  })
  login: string;

  @Column()
  pwdHash: string;

  @Column({
    default: null,
    nullable: true,
  })
  currentTokenId: string | null
}
