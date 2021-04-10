import dayjs from "dayjs";

import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-Memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";

let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let createRentalUseCase: CreateRentalUseCase;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", () => {

  const dayAdd24Hours = dayjs().add(1, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsDateProvider);
  });

  it("Should be able to create a new rental", async () => {
    await carsRepositoryInMemory.create({
      id: "bb000b00-000b-0b0b-00b0-0b0b000b0b0",
      category_id: "bb000b00-000b-0b0b-00b0-0b0b000b0b0",
      name: "Car test",
      description: "Description car test",
      daily_rate: 450,
      fine_amount: 80,
      license_plate: "ATT-1564",
      brand: "Test"
    })

    const rental = await createRentalUseCase.execute({
      user_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      car_id: "bb000b00-000b-0b0b-00b0-0b0b000b0b0",
      expected_return_date: dayAdd24Hours
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should be not able to create a new rental if there is another open to the same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
        car_id: "bb000b00-000b-0b0b-00b0-0b0b000b0b0",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
        car_id: "bb000b00-000b-0b0b-00b0-0b0b000b0b0",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be not able to create a new rental if there is another open to the same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
        car_id: "bb000b00-000b-0b0b-00b0-0b0b000b0b0",
        expected_return_date: dayAdd24Hours
      });

      await createRentalUseCase.execute({
        user_id: "cc000c00-000c-0c0c-00c0-0c0c000c0c0",
        car_id: "bb000b00-000b-0b0b-00b0-0b0b000b0b0",
        expected_return_date: dayAdd24Hours
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be not able to create a new rental with invalid return time", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
        car_id: "bb000b00-000b-0b0b-00b0-0b0b000b0b0",
        expected_return_date: dayjs().toDate()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});