import request from "supertest";
import faker from "faker";
import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import { app } from "@shared/infra/http/app";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";

let connection: Connection;

describe("Create Category Controller", () => {
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

  const name = faker.name.findName();
  const description = faker.lorem.paragraph()

  it("Should be able to create a new category", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({
        email: "admin@rentex.com.br",
        password: "admin"
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name,
        description
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category with name exist", async () => {
    const responseToken = await request(app)
      .post("/session")
      .send({
        email: "admin@rentex.com.br",
        password: "admin"
      });

    const { token } = responseToken.body;

    const response = await request(app)
      .post("/categories")
      .send({
        name,
        description
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(400);
  });
})