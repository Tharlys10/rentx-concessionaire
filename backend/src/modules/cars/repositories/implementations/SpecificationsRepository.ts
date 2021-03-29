import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepository } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
  private repository: Repository<Specification>

  constructor() {
    this.repository = getRepository(Specification);
  }

  async findByName(name: string): Promise<Specification> {
    const specification = await this.repository.findOne({ name });

    return specification
  }

  async find(): Promise<Specification[]> {
    const specifications = await this.repository.find();

    return specifications;
  }

  async create({ name, description }: ICreateSpecificationDTO): Promise<Specification> {
    const specification = this.repository.create({
      name,
      description,
    });

    const specificationCreate = await this.repository.save(specification);

    return specificationCreate;
  }

}

export { SpecificationsRepository }