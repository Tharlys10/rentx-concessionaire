import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";

import { AppError } from "@shared/errors/AppError";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }

  async execute({ token, password }: IRequest): Promise<void> {
    const userTokens = await this.usersTokensRepository.findByRefreshToken(token);

    if (!userTokens) {
      throw new AppError("Token invalid!");
    }

    const checkExpiration = this.dateProvider.compareIfBefore(userTokens.expires_date, this.dateProvider.dateNow())

    if (checkExpiration) {
      throw new AppError("Token expired!");
    }

    const user = await this.usersRepository.findById(userTokens.user_id);

    user.password = await hash(password, 8);

    await this.usersRepository.create(user);

    await this.usersTokensRepository.deleteById(userTokens.id);
  }
}

export { ResetPasswordUseCase }