import { Injectable } from "@nestjs/common";
import { ModuleInterface } from "src/types";
import { ModuleEntity } from "./module.entity";

@Injectable()
export class ModuleService {

  async getAllModules(): Promise<ModuleInterface[]> {
    return ModuleEntity.find()
  }

  async addModule(module: string) {
    const newModule = new ModuleEntity();
    newModule.module = module.charAt(0).toUpperCase() + module.slice(1).toLowerCase();


    await newModule.save()

    return {
      id: newModule.id,
      module: newModule.module
    }
  }
}
