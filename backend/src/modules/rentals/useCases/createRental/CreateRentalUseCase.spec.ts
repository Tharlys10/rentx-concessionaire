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

  const dayAdd2Days = dayjs().add(2, "day").toDate();

  beforeEach(() => {
    rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
    carsRepositoryInMemory = new CarsRepositoryInMemory();
    dayjsDateProvider = new DayjsDateProvider();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepositoryInMemory, carsRepositoryInMemory, dayjsDateProvider);
  });

  it("Should be able to create a new rental", async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
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
      car_id,
      expected_return_date: dayAdd2Days
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should be not able to create a new rental if there is another open to the same user", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      car_id: "f000f00-000f-0f0f-00f0-0f0f000f0f0",
      expected_return_date: dayAdd2Days
    });

    await expect(createRentalUseCase.execute(
      {
        user_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
        car_id: "e000e00-000e-0e0e-00e0-0e0e000e0e0",
        expected_return_date: dayAdd2Days
      }
    )).rejects.toEqual(new AppError("There's a rental in progress for user!"))
  });

  it("Should be not able to create a new rental if there is another open to the same car", async () => {
    await rentalsRepositoryInMemory.create({
      user_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      car_id: "k000k00-000k-0k0k-00k0-0k0k000k0k0",
      expected_return_date: dayAdd2Days
    });

    await expect(createRentalUseCase.execute({
      user_id: "cc000c00-000c-0c0c-00c0-0c0c000c0c0",
      car_id: "k000k00-000k-0k0k-00k0-0k0k000k0k0",
      expected_return_date: dayAdd2Days
    })
    ).rejects.toEqual(new AppError("Car is unavailable!"))
  });

  it("Should be not able to create a new rental with invalid return time", async () => {
    const { id: car_id } = await carsRepositoryInMemory.create({
      category_id: "aa000a00-000a-0a0a-00a0-0a0a000a0a0",
      name: "New Car Return Time",
      description: "Description Car",
      daily_rate: 432,
      license_plate: "ASD-2132",
      fine_amount: 121,
      brand: "Brand"
    });

    await expect(createRentalUseCase.execute(
      {
        user_id: "mm000m00-000m-0m0m-00m0-0m0m000m0m0",
        car_id,
        expected_return_date: dayjs().toDate()
      }
    )
    ).rejects.toEqual(new AppError("Invalid return time!"))
  });
});