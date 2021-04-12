import { Router } from "express";
import { authenticateRoutes } from "./authentications.routes";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { passwordRoutes } from "./password.routes";
import { rentalsRoutes } from "./rentals.routes";
import { specificationRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const router = Router();

router.use(authenticateRoutes);
router.use("/cars", carsRoutes);
router.use("/categories", categoriesRoutes);
router.use("/password", passwordRoutes);
router.use("/rentals", rentalsRoutes);
router.use("/specifications", specificationRoutes);
router.use("/users", usersRoutes);

export { router }