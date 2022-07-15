import { Injectable } from '@nestjs/common';
import { RegisterUser, UserResponseForAdmin } from "../types";
import { UserEntity } from "./user.entity";
import { hashPwd } from "../utils/hash-pwd";
import { Like } from "typeorm";

@Injectable()
export class UserService {

  async register(req: RegisterUser) {
    const {login, password} = req

    const isUserExist = await UserEntity.findOne({
      where: {login}
    })

    if(isUserExist) {
      throw new Error('Taki użtykownik już istnieje.')
    }

    const user = new UserEntity()
    user.login = login;
    user.pwdHash = hashPwd(password);

    await user.save()

    return user
  }

  async getOne(id: string): Promise<UserEntity> {
    return await UserEntity.findOne({where: {
      id
      }})

  }

  async searchAll(): Promise<UserResponseForAdmin[]> {
    return await UserEntity.find({
      select: ['id', 'login']
    })
  }

  async search(content: string): Promise<UserResponseForAdmin[]> {
    return await UserEntity.find({
      select: ['id', 'login'],
      where: {
        login: Like(`%${content}%`),
      }
    })
  }

  async delete(id: string) {
    const user = await UserEntity.findOne({
      where: {id}
    })

    if(!user) {
      throw new Error('Użytkownik o takim ID nie istnieje.')
    }

    await UserEntity.delete({id})
  }
}
