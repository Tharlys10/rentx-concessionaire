import { Router } from "express";
import { AuthenticationUserController } from "../modules/accounts/UseCases/authenticationUser/AuthenticationUserController";

const authenticationsRoutes = Router();

const authenticationUserController = new AuthenticationUserController();

authenticationsRoutes.post("/session", authenticationUserController.handle)

export { authenticationsRoutes }