import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { User } from "@modules/accounts/infra/typeorm/entities/User";
import { AppError } from "@shared/errors/AppError";

@injectable()
class CreateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({
    name,
    password,
    email,
    driver_license
  }: ICreateUserDTO): Promise<User> {
    const userAlreadyExist = await this.usersRepository.findByEmail(email);

    if (userAlreadyExist) {
      throw new AppError("User already exist!");
    }

    const passwordHash = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      password: passwordHash,
      email,
      driver_license
    });

    return user;
  }
}

export { CreateUserUseCase }