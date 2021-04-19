import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { DevolutionRentalController } from '@modules/rentals/useCases/devolutionRental/DevolutionRentalController';
import { ListRentalByUserController } from '@modules/rentals/useCases/listRentalByUser/listRentalByUserController';
import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const devolutionRentalController = new DevolutionRentalController();
const listRentalByUserController = new ListRentalByUserController();

rentalsRoutes.post("/", ensureAuthentication, createRentalController.handle)
rentalsRoutes.post("/devolution/:id", ensureAuthentication, devolutionRentalController.handle)
rentalsRoutes.get("/user", ensureAuthentication, listRentalByUserController.handle)

export { rentalsRoutes }