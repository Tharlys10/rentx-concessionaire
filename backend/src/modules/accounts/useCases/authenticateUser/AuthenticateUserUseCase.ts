import { inject, injectable } from "tsyringe";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string,
  password: string,
}

interface IResponse {
  token: string,
  user: {
    name: string,
    email: string,
  }
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository
  ) { }

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "d5e80b8fdcb061b0ff78dec00a992757", {
      subject: user.id,
      expiresIn: "1d"
    })

    const session: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email,
      }
    }

    return session;
  }
}

export { AuthenticateUserUseCase }