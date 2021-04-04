import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase"

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory);
  })

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      name: "New Car",
      description: "Description Car",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand"
    });

    expect(car).toHaveProperty("id");
  });

  it("Should be able to create a new car with exists license plate", async () => {
    expect(async () => {
      await createCarUseCase.execute({
        category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
        name: "New Car One",
        description: "Description Car One",
        daily_rate: 100,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand"
      });

      await createCarUseCase.execute({
        category_id: "category",
        name: "New Car Two",
        description: "Description Car Two",
        daily_rate: 150,
        license_plate: "ABC-1234",
        fine_amount: 60,
        brand: "Brand"
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to create a new car with available true by default", async () => {
    const car = await createCarUseCase.execute({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      name: "New Car Available",
      description: "Description Car",
      daily_rate: 150,
      license_plate: "ABCD-1234",
      fine_amount: 60,
      brand: "Brand"
    });

    expect(car.available).toBe(true);
  });

})