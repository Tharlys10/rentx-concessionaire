import { getRepository, Repository } from "typeorm"
import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO"
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository"
import { CarImage } from "../entities/CarImages"

class CarsImagesRepository implements ICarsImagesRepository {
  private repository: Repository<CarImage>;

  constructor() {
    this.repository = getRepository(CarImage);
  }

  async create({ car_id, image_name }: ICreateCarImageDTO): Promise<CarImage> {
    const carImage = this.repository.create({
      car_id,
      image_name
    });

    await this.repository.save(carImage);

    return carImage;
  }
}

export { CarsImagesRepository }