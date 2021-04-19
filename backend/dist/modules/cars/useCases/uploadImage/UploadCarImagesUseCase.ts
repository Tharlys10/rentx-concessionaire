import { inject, injectable } from "tsyringe";
import { ICreateCarImageDTO } from "@modules/cars/dtos/ICreateCarImageDTO";
import { CarImage } from "@modules/cars/infra/typeorm/entities/CarImages";
import { ICarsImagesRepository } from "@modules/cars/repositories/ICarsImagesRepository";
import { IStorageProvider } from "@shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest {
  car_id: string;
  image_name: string[];
}

@injectable()
class UploadCarImagesUseCase {
  constructor(
    @inject("CarsImagesRepository")
    private carsImagesRepository: ICarsImagesRepository,
    @inject("StorageProvider")
    private storageProvider: IStorageProvider
  ) { }

  async execute({ car_id, image_name }: IRequest): Promise<void> {

    image_name.map(async (image) => {
      await this.carsImagesRepository.create({
        car_id,
        image_name: image
      });
      await this.storageProvider.save(image, "cars");
    });
  }
}

export { UploadCarImagesUseCase }