import { inject, injectable } from "tsyringe";
import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImages";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";

interface IRequest {
  car_id: string;
  image_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository
  ) { }

  async execute({ car_id, image_name }: IRequest): Promise<void> {

    image_name.map(async (name) => {
      await this.carsImagesRepository.create({
        car_id,
        image_name: name
      });
    });
  }
}

export { UploadCarImagesUseCase }