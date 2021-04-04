import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";


const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();

carsRoutes.post("/", ensureAuthentication, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)

export { carsRoutes }