import { ICreateUserTokenDTO } from "@modules/accounts/dtos/ICreateUserTokenDTO"
import { UserTokens } from "@modules/accounts/infra/typeorm/entities/UserTokens"
import { IUsersTokensRepository } from "../IUsersTokensRepository"

class UsersTokensRepositoryInMemory implements IUsersTokensRepository {
  private usersToken: UserTokens[] = [];

  async create({ user_id, refresh_token, expires_date }: ICreateUserTokenDTO): Promise<UserTokens> {
    const userToken = new UserTokens();

    Object.assign(userToken, {
      user_id,
      refresh_token,
      expires_date
    });

    this.usersToken.push(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
    return this.usersToken.find(userToken => userToken.id === user_id && userToken.refresh_token === refresh_token)
  }

  async deleteById(id: string): Promise<void> {
    const userRefreshTokenIndex = this.usersToken.findIndex(userToken => userToken.id === id);

    this.usersToken.splice(userRefreshTokenIndex, 1);
  }

  async findByRefreshToken(refresh_token: string): Promise<UserTokens> {
    return this.usersToken.find(userToken => userToken.refresh_token === refresh_token)
  }
}

export { UsersTokensRepositoryInMemory }