import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase"

let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarSpecificationUseCase: CreateCarSpecificationUseCase;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepositoryInMemory, specificationsRepositoryInMemory);
  });

  it("Should be able to add a new specification to a now-existent car", async () => {
    expect(async () => {
      const car_id = "aa000a00-000a-0a0a-00a0-0a0a000a0a0";
      const specifications_id = ["aa000a00-000a-0a0a-00a0-0a0a000a0a0"];

      await createCarSpecificationUseCase.execute({
        car_id,
        specifications_id
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to add a new specification to the car", async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      name: "New Car One",
      description: "Description Car One",
      daily_rate: 100,
      license_plate: "ABC-1234",
      fine_amount: 60,
      brand: "Brand"
    });

    const { id: specification_id } = await specificationsRepositoryInMemory.create({
      name: "Specification test",
      description: "Description specification from test"
    })

    const specificationsCar = await createCarSpecificationUseCase.execute({
      car_id,
      specifications_id: [specification_id]
    });

    expect(specificationsCar).toHaveProperty("specifications");
    expect(specificationsCar.specifications.length).toBe(1);
  });
})