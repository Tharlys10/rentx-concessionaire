import { Router } from "express";
import multer from "multer";

import { ensureAuthentication } from "@shared/infra/http/middlewares/ensureAuthentication";

import { CreateUserController } from "@modules/accounts/useCases/createUser/CreateUserController";
import { UpdateUserAvatarController } from "@modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController";

import uploadConfig from "@config/upload";
import { ProfileUserController } from "@modules/accounts/useCases/profileUserUseCase/ProfileUserController";

const usersRoutes = Router();

const upload = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);

usersRoutes.patch("/avatar", upload.single("avatar"), ensureAuthentication, updateUserAvatarController.handle)

usersRoutes.get("/", ensureAuthentication, profileUserController.handle)

export { usersRoutes }