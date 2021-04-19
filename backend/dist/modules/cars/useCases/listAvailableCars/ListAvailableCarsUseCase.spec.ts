import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let listCarsUseCase: ListAvailableCarsUseCase;

describe("List Cars", () => {
  beforeEach(() => {
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    listCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
  });

  it("Should be able to list all available cars", async () => {
    const car = await carsRepositoryInMemory.create({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      name: "Car One",
      description: "Car One Create",
      daily_rate: 120,
      license_plate: "ABC-1234",
      fine_amount: 40,
      brand: "Car"
    });

    const cars = await listCarsUseCase.execute({});

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by brand", async () => {
    const car = await carsRepositoryInMemory.create({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      name: "Car Two",
      description: "Car Two Create",
      daily_rate: 245,
      license_plate: "ABC-4878",
      fine_amount: 85,
      brand: "Car Test"
    });

    const cars = await listCarsUseCase.execute({
      brand: "Car Test"
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by name", async () => {
    const car = await carsRepositoryInMemory.create({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      name: "Car By Name",
      description: "Car Create Description",
      daily_rate: 145,
      license_plate: "ADE-4878",
      fine_amount: 45,
      brand: "Car"
    });

    const cars = await listCarsUseCase.execute({
      name: "Car By Name"
    });

    expect(cars).toEqual([car]);
  });

  it("Should be able to list all available cars by category ID", async () => {
    const car = await carsRepositoryInMemory.create({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      name: "Car",
      description: "Car Create Description",
      daily_rate: 145,
      license_plate: "UDA-8454",
      fine_amount: 45,
      brand: "Car"
    });

    const cars = await listCarsUseCase.execute({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0"
    });

    expect(cars).toEqual([car]);
  });
});