import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";

export const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  console.error("Error:", err);

  let statusCode = 500;
  let message = "Internal Server Error";

  // Manejo de errores de Prisma
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    if (err.code === "P2002") { // Error por duplicado (ejemplo: email registrado)
      statusCode = 409;
      message = "El recurso ya existe (violación de unicidad)";
    }
  }

  // Manejo de errores estándar
  if (err.message.includes("not found")) statusCode = 404;
  if (err.message.includes("Invalid credentials")) statusCode = 401;
  if (err.message.includes("Autenticación requerida")) statusCode = 401;

  res.status(statusCode).json({
    error: {
      message,
      code: statusCode,
    },
  });
};
