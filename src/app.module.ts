import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ModuleModule } from './module/module.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionModule } from './question/question.module';
import { ExamModule } from './exam/exam.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { configData } from "./configData/configData";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: configData.DB_HOST,
      port: configData.DB_PORT,
      username: configData.DB_USERNAME,
      password: configData.DB_PASSWORD,
      database: configData.DB_DATABASE,
      entities: ["dist/**/**.entity{.ts,.js}"],
      bigNumberStrings: false,
      logging: true,
      synchronize: true,
    }),
    ModuleModule,
    QuestionModule,
    ExamModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
