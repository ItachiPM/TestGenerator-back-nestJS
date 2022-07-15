import { Body, Controller, Delete, Get, Inject, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { RegisterUser, UserResponseForAdmin } from "../types";

@Controller('user')
export class UserController {

  constructor(
    @Inject(UserService) private userService: UserService
  ) {}

  @Post('/register')
  async register(
    @Body() req: RegisterUser,
  ) {
    return this.userService.register(req)
  }
  @Get('/search/:content')
  async search(
    @Param('content') content: string
  ): Promise<UserResponseForAdmin[]> {
    return this.userService.search(content)
  }

  @Get('/search')
  async searchAll(): Promise<UserResponseForAdmin[]> {
    return this.userService.searchAll()
  }

  @Delete('/:id')
  async delete(
    @Param('id') id: string
  ) {
    return this.userService.delete(id)
  }
}
