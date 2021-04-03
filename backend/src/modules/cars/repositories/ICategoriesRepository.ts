import { Category } from "../infra/typeorm/entities/Category";

// DTOs
interface ICreateCategoryDTO {
  name: string;
  description: string;
}

interface ICategoriesRepository {
  findByName(name: string): Promise<Category>;
  find(): Promise<Category[]>;
  create({ name, description }: ICreateCategoryDTO): Promise<Category>;
}

export { ICreateCategoryDTO, ICategoriesRepository }