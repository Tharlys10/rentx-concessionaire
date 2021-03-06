
import { AppError } from "@shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "@modules/cars/repositories/in-memory/CategoriesRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;

describe("Create Category", () => {

  beforeEach(() => {
    categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
    createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory);
  })

  it("Should be able to create a new category", async () => {
    const category = await createCategoryUseCase.execute({
      name: "Category test",
      description: "Category description test"
    });

    expect(category).toHaveProperty("id");
  });

  it("Should not be able to create a new category with name exists", async () => {
    await createCategoryUseCase.execute({
      name: "Category test",
      description: "Category description test"
    });

    await expect(createCategoryUseCase.execute({
      name: "Category test",
      description: "Category description test"
    })
    ).rejects.toEqual(new AppError("Category already exist!"))
  });
})