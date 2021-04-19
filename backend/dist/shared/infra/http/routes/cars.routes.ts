import { Router } from "express";

import { ensureAuthentication } from "../middlewares/ensureAuthentication";
import { ensureAdmin } from "../middlewares/ensureAdmin";

import multer from "multer";
import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpeficication/CreateCarSpecificationController";
import { UploadCarImagesController } from "@modules/cars/useCases/uploadImage/UploadCarImagesController";

import uploadConfig from "@config/upload";

const carsRoutes = Router();

const upload = multer(uploadConfig);

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListAvailableCarsController();
const createCarSpecificationController = new CreateCarSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

carsRoutes.post("/", ensureAuthentication, ensureAdmin, createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle);

carsRoutes.post("/specifications/:id", ensureAuthentication, ensureAdmin, createCarSpecificationController.handle);

carsRoutes.post("/images/:id", upload.array("images"), ensureAuthentication, ensureAdmin, uploadCarImagesController.handle);

export { carsRoutes }