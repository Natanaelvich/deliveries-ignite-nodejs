import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import routes from "./routes";

const app = express();

app.use(express.json());

app.use(routes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status ?? 500);
  res.json({
    success: false,
    error: err.message || "Internal error occured",
  });

  next(err);
});

app.listen(3000);
