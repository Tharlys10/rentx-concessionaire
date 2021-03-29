import { inject, injectable } from "tsyringe";
import { deleteFile } from "../../../../utils/file";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  userID: string,
  avatarFile: string
}

@injectable()
class UpdateUserAvatarUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ userID, avatarFile }: IRequest): Promise<void> {
    const user = await this.usersRepository.findByID(userID);

    if (user.avatar) {
      deleteFile(`./tmp/avatar/${user.avatar}`)
    }

    user.avatar = avatarFile;

    await this.usersRepository.create(user);
  }
}

export { UpdateUserAvatarUseCase }