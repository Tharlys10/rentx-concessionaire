import { container } from "tsyringe";

import { IDateProvider } from "./IDateProvider";
import { DayjsDateProvider } from "./implementations/DayjsDateProvider";

// IDateProvider
container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);

