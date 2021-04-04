import { Specification } from "../infra/typeorm/entities/Specification";

// DTOs
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
  find(): Promise<Specification[]>;
  findByName(name: string): Promise<Specification>;
  findByIds(ids: string[]): Promise<Specification[]>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository }