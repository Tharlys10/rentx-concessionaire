import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import auth from "@config/auth";
import { UsersTokensRepository } from "@modules/accounts/infra/typeorm/repositories/UsersTokensRepository";

interface IPayload {
  sub: string
}

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  const usersTokensRepository = new UsersTokensRepository();

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userID } = verify(token, auth.secret_refresh_token) as IPayload;

    const user = await usersTokensRepository.findByUserIdAndRefreshToken(userID, token);

    if (!user) {
      throw new AppError("User does not exist!", 401);
    }

    request.user = {
      id: user.user_id
    }

    next();

  } catch {
    throw new AppError("Token invalid!", 401);
  }

}