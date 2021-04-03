import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";

interface IPayload {
  sub: string
}

export async function ensureAuthentication(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError("Token missing!", 401);
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: userID } = verify(token, "d5e80b8fdcb061b0ff78dec00a992757") as IPayload;

    const usersRepository = new UsersRepository();
    const user = await usersRepository.findByID(userID);

    if (!user) {
      throw new AppError("User does not exist!", 401);
    }

    request.user = {
      id: user.id
    }

    next();

  } catch {
    throw new AppError("Token invalid!", 401);
  }

}