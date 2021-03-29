import { container } from "tsyringe";

import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository";
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository";

import { ICategoriesRepository } from "../../modules/cars/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/cars/repositories/implementations/CategoriesRepository";

import { SpecificationsRepository } from "../../modules/cars/repositories/implementations/SpecificationsRepository";
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository";

// IUsersRepository
container.registerSingleton<IUsersRepository>("UsersRepository", UsersRepository);

// ICategoriesRepository
container.registerSingleton<ICategoriesRepository>("CategoriesRepository", CategoriesRepository);

// ISpecificationsRepository
container.registerSingleton<ISpecificationsRepository>("SpecificationsRepository", SpecificationsRepository);
