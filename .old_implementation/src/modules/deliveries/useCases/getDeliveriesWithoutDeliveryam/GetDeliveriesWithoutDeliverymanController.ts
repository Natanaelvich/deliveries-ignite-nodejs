import { Request, Response } from "express";
import { GetDeliveriesWithoutDeliverymanUseCase } from "./GetDeliveriesWithoutDeliverymanUseCase";

export class GetDeliveriesWithoutDeliverymanController {
  async handle(request: Request, response: Response) {
    const getDeliveriesWithoutDeliverymanUseCase =
      new GetDeliveriesWithoutDeliverymanUseCase();

    const deliveries = await getDeliveriesWithoutDeliverymanUseCase.execute();

    response.json(deliveries);
  }
}
