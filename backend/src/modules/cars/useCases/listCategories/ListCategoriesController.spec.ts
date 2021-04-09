import request from "supertest";
import faker from "faker";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("List Category Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();

    await connection.runMigrations();

    const id = uuid();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users 
        (id, name, email, password, driver_license, is_admin, created_at) 
        VALUES
        ('${id}', 'admin', 'admin@rentex.com.br', '${password}', 'XXXXXX', true, 'now()')
      `
    );
  })

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  })


  it("Should be able to list all categories", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({
        email: "admin@rentex.com.br",
        password: "admin"
      });

    const { token } = responseToken.body;
    const name = faker.name.findName()

    await request(app)
      .post("/categories")
      .send({
        name,
        description: faker.lorem.paragraph()
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    const response = await request(app)
      .get("/categories")
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual(name);
  });
})