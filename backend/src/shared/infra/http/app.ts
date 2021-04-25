import "reflect-metadata";
import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import 'express-async-errors';

import swaggerUi from "swagger-ui-express";
import swaggerFile from "../../../swagger.json";

import createConnection from "@shared/infra/typeorm";

import "@shared/container";

import cors from 'cors';

import { router } from "./routes";
import { AppError } from "@shared/errors/AppError";

import upload from "@config/upload";

createConnection();

const app = express();

app.use(express.json());

app.use("/rentxserver/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/rentxserver/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/rentxserver/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());

app.use("/rentxserver", router);

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

export { app }
