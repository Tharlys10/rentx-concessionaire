import { Router } from 'express';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.post('/', ensureAuthentication, ensureAdmin, createSpecificationController.handle);

export { specificationRoutes }