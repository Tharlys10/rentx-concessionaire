import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken"
import auth from "@config/auth";
import { IUsersTokensRepository } from "@modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "@shared/errors/AppError";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IPayload {
  sub: string;
  email: string
}

interface IResponse {
  token: string;
  refresh_token: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: IDateProvider,
  ) { }

  async execute(token: string): Promise<IResponse> {
    const { secret_refresh_token, expires_in_refresh_token, expires_refresh_token_days, secret_token, expires_in_token } = auth;

    const { email, sub } = verify(token, secret_refresh_token) as IPayload;

    const user_id = sub;

    const userTokens = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token);

    if (!userTokens) {
      throw new AppError("Refresh token does not exists!");
    }

    await this.usersTokensRepository.deleteById(userTokens.id);

    const refresh_token = sign({ email }, secret_refresh_token, {
      subject: user_id,
      expiresIn: expires_in_refresh_token
    });

    const refresh_token_expires_date = this.dateProvider.addDays(expires_refresh_token_days);

    await this.usersTokensRepository.create({
      user_id,
      refresh_token,
      expires_date: refresh_token_expires_date,
    });

    const tokenUser = sign({}, secret_token, {
      subject: user_id,
      expiresIn: expires_in_token
    });

    const refreshResponse: IResponse = {
      token: tokenUser,
      refresh_token
    }

    return refreshResponse;
  }
}

export { RefreshTokenUseCase }