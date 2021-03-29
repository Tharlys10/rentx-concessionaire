import { getRepository, Repository } from "typeorm";
import { Category } from "../../entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>

  constructor() {
    this.repository = getRepository(Category);
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ name })

    return category;
  }

  async find(): Promise<Category[]> {
    const categories = await this.repository.find();

    return categories;
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({
      name,
      description
    });

    const categoryCreate = await this.repository.save(category);

    return categoryCreate;
  }
}

export { CategoriesRepository }