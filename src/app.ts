import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { router } from "./routes";
import { errorHandler } from "./middleware/errorHandler";
import expres from './types/express';

const app = express();

// Middlewares básicos
app.use(cors());
app.use((req: Request, res: Response, next: NextFunction) => {
  next();
});
app.use(express.json());
// Rutas principales
app.use("/api", router);

// Health check
app.get("/ping", async (_req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).send("pong");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

// Manejo de errores global
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
