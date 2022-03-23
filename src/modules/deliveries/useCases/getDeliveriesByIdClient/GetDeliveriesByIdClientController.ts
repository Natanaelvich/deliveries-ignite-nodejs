import { Request, Response } from "express";
import { GetDeliveriesByIdClientUseCase } from "./GetDeliveriesByIdClientUseCase";

export class GetDeliveriesByIdClientController {
  async handle(request: Request, response: Response) {
    const { id } = request;

    const getDeliveriesByIdClientUseCase = new GetDeliveriesByIdClientUseCase();

    const deliveries = await getDeliveriesByIdClientUseCase.execute({
      idClient: id,
    });

    response.json(deliveries);
  }
}
