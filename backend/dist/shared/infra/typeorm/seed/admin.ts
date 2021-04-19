import { hash } from "bcrypt";
import { getConnection } from "typeorm";
import { v4 as uuid } from "uuid";

import createConnection from "../index"

async function create() {
  const connection = await createConnection("172.22.0.2");

  const id = uuid();

  const password = await hash("admin", 8);

  await connection.query(
    `INSERT INTO users 
      (id, name, email, password, driver_license, is_admin, created_at) 
      VALUES
      ('${id}', 'admin', 'admin@rentex.com.br', '${password}', 'XXXXXX', true, 'now()')
    `
  );

  await connection.close;
}

create().then(() => console.log("User admin created!"));