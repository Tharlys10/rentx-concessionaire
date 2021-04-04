import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpeficication/CreateCarSpecificationController";


const carsRoutes = Router();

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();

carsRoutes.post("/", ensureAuthentication, ensureAdmin, createCarController.handle)
carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id", ensureAuthentication, ensureAdmin, createCarSpecificationController.handle)

export { carsRoutes }