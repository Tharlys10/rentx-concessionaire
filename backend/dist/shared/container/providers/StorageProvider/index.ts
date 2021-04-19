import { container } from "tsyringe";

import { IStorageProvider } from "./IStorageProvider";
import { LocalStorageProvider } from "./implementations/LocalStorageProvider";
import { S3StorageProvider } from "./implementations/S3StorageProvider";

const diskStorage = {
  local: LocalStorageProvider,
  s3: S3StorageProvider
}

// IStorageProvider
container.registerSingleton<IStorageProvider>("StorageProvider", diskStorage[process.env.DISK]);