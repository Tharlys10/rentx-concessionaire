import fs from "fs";

export const deleteFile = async (fileDir: string) => {
  try {
    await fs.promises.stat(fileDir);
  } catch {
    return;
  }

  await fs.promises.unlink(fileDir);
}