import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { getRepository, Repository } from "typeorm";
import { Car } from "../entities/Car";

class CarsRepository implements ICarsRepository {
  private repository: Repository<Car>

  constructor() {
    this.repository = getRepository(Car);
  }

  async create({
    category_id,
    name,
    description,
    daily_rate,
    license_plate,
    fine_amount,
    brand
  }: ICreateCarDTO): Promise<Car> {
    const car = this.repository.create({
      category_id,
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand
    });

    await this.repository.save(car);

    return car;
  }

  async findByLicensePlate(license_plate: string): Promise<Car> {
    return await this.repository.findOne({ license_plate })
  }

  async findAvailable(category_id?: string, name?: string, brand?: string): Promise<Car[]> {
    const carsQuery = this.repository
      .createQueryBuilder("cars")
      .where("available = :available", { available: true })

    if (category_id) {
      carsQuery.andWhere("category_id = :category_id", { category_id })
    }

    if (name) {
      carsQuery.andWhere("name = :name", { name })
    }

    if (brand) {
      carsQuery.andWhere("brand = :brand", { brand })
    }

    const cars = await carsQuery.getMany();

    return cars;
  }
}

export { CarsRepository }