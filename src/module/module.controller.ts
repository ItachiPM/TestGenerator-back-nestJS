import { Controller, Get, Inject } from "@nestjs/common";
import { ModuleInterface } from "src/types";
import { ModuleService } from "./module.service";

@Controller('modules')
export class ModuleController {

  constructor(
    @Inject(ModuleService) private moduleService: ModuleService
  ) {}

  @Get('/')
  async getAllModules(): Promise<ModuleInterface[]> {
    return this.moduleService.getAllModules()
  }
}
