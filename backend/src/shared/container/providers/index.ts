import { container } from "tsyringe";

import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayjsDateProvider } from "./DateProvider/implementations/DayjsDateProvider";

import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";

// IDateProvider
container.registerSingleton<IDateProvider>("DayjsDateProvider", DayjsDateProvider);

// IMailProvider
container.registerInstance<IMailProvider>("EtherealMailProvider", new EtherealMailProvider());
