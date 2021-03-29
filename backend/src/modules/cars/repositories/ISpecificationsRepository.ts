import { Specification } from "../entities/Specification";

// DTOs
interface ICreateSpecificationDTO {
  name: string;
  description: string;
}

interface ISpecificationsRepository {
  findByName(name: string): Promise<Specification>;
  find(): Promise<Specification[]>;
  create({ name, description }: ICreateSpecificationDTO): Promise<Specification>;
}

export { ICreateSpecificationDTO, ISpecificationsRepository }