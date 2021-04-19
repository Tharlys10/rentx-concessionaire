import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

@injectable()
class CreateCarUseCase {
  constructor(
    @inject("CarsRepository")
    private carsRepository: ICarsRepository
  ) { }

  async execute({
    category_id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand
  }: ICreateCarDTO): Promise<Car> {
    const carAlreadyExist = await this.carsRepository.findByLicensePlate(license_plate);

    if (carAlreadyExist) {
      throw new AppError("Car already exists!");
    }

    const car = await this.carsRepository.create({
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand
    });

    return car;
  }
}

export { CreateCarUseCase }