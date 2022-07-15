import { Injectable } from '@nestjs/common';
import { JwtPayload } from "./jwt.strategy";
import { UserEntity } from "../user/user.entity";
import {v4 as uuid} from 'uuid';
import { AuthLoginDto } from "./dto/auth-login.dto";
import { hashPwd } from "../utils/hash-pwd";
import { Response } from "express";
import { sign } from "jsonwebtoken";
import { configData } from "../configData/configData";


@Injectable()
export class AuthService {
  private createToken(currentTokenId: string): {accessToken: string, expiresIn: number} {
    const payload: JwtPayload = {id: currentTokenId};
    const expiresIn = 60 * 60 * 24;
    const accessToken = sign(payload, configData.SECRETORKEY, { expiresIn})

    return {
      accessToken,
      expiresIn
    };
  }

  private async generateToken(user: UserEntity): Promise<string> {
    let token;
    let userWithThisToken = null;
    do {
      token = uuid()
      userWithThisToken = await UserEntity.findOne({
        where: {
          currentTokenId: token,
        }
      })
    } while(!!userWithThisToken)

    user.currentTokenId = token;
    await user.save()

    return token;
  }

  async login(req: AuthLoginDto, res: Response): Promise<any> {
    try {
      const user = await UserEntity.findOne({
        where: {
          login: req.login,
          pwdHash: hashPwd(req.password)
        }
      })
      if(!user) {
        return res.json({error: 'Invalid login data!'});
      }
      const token = this.createToken(await this.generateToken(user))

      return res
        .cookie('jwt', token.accessToken, {
          secure: false,
          domain: 'localhost',
          httpOnly: true,
        })
        .json({ok: true})
    } catch (e) {
      res.json({error: e.message})
    }
  }

  async logout(user: UserEntity, res: Response) {
    try {
      user.currentTokenId = null;
      await user.save();
      res.clearCookie('jwt', {
        secure: false,
        domain: 'localhost',
        httpOnly: true,
      });
      return res.json({ok: true});
    } catch (e) {
      return res.json({error: e.message})
    }
  }
}
