import { Router } from 'express';
import { ensureAuthentication } from '@shared/infra/http/middlewares/ensureAuthentication';
import { CreateSpecificationController } from '@modules/cars/useCases/createSpecification/CreateSpecificationController';

const specificationRoutes = Router();

const createSpecificationController = new CreateSpecificationController();

specificationRoutes.use(ensureAuthentication);
specificationRoutes.post('/', createSpecificationController.handle);

export { specificationRoutes }