import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

// IDateProvider
container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);
