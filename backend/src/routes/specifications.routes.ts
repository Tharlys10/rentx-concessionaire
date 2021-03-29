import { Router } from 'express';
import { ensureAuthentication } from '../middlewares/ensureAuthentication';
import { CreateSpecificationController } from '../modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post('/', ensureAuthentication, createSpecificationController.handle);

export { specificationRoutes }