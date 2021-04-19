import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository } from "@modules/cars/repositories/ISpecificationsRepository";

interface IRequest {
  name: string;
  description: string;
}

@injectable()
class CreateSpecificationUseCase {
  constructor(
    @inject("SpecificationsRepository")
    private specificationsRepository: ISpecificationsRepository
  ) { };

  async execute({ name, description }: IRequest): Promise<Specification> {
    const specificationAlreadyExist = await this.specificationsRepository.findByName(name);

    if (specificationAlreadyExist) {
      throw new AppError("Specification already exist!");
    }

    const specification = await this.specificationsRepository.create({ name, description });

    return specification;
  }
}

export { CreateSpecificationUseCase }