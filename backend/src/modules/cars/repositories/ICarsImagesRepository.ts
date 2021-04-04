import { ICreateCarImageDTO } from "../dtos/ICreateCarImageDTO";

interface ICarsImagesRepository {
  create(data: ICreateCarImageDTO): Promise<CarImage>;
}

export { ICarsImagesRepository }