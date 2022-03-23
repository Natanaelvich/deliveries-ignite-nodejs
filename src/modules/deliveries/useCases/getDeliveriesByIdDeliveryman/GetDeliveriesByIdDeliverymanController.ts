import { Request, Response } from "express";
import { GetDeliveriesByIdDeliverymanUseCase } from "./GetDeliveriesByIdDeliverymanUseCase";

export class GetDeliveriesByIdDeliverymanController {
  async handle(request: Request, response: Response) {
    const { id } = request;

    const getDeliveriesByIdDeliverymanUseCase =
      new GetDeliveriesByIdDeliverymanUseCase();

    const deliveries = await getDeliveriesByIdDeliverymanUseCase.execute({
      idDeliveryman: id,
    });

    response.json(deliveries);
  }
}
