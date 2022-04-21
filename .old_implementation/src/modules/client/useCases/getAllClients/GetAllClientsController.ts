import { Request, Response } from "express";
import { GetAllClientsUseCase } from "./GetAllClientsUseCase";

export class GetAllClientsController {
  async handle(request: Request, response: Response) {
    const getAllClientsUseCase = new GetAllClientsUseCase();

    const clients = await getAllClientsUseCase.execute();

    response.json(clients);
  }
}
