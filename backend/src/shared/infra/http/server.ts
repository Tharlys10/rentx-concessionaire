import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";

import createConnection from "@shared/infra/typeorm";

import "@shared/container";

import { router } from "./routes";
import { AppError } from "@shared/errors/AppError";

createConnection();

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);

// errors
app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      statusCode: err.statusCode,
      message: err.message
    });
  }

  return response.status(500).json({
    status: "Error",
    message: `Internal server error - ${err.message}`
  });
});

const port = Number(process.env.PORT) | 3333;

app.listen(port, () => console.log(`🚀 - server is running! - 📡 port ${port}`));
