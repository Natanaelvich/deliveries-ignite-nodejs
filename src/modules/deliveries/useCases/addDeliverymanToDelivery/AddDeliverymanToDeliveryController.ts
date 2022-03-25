import { Request, Response } from "express";
import { AddDeliverymanToDeliveryUseCase } from "./AddDeliverymanToDeliveryUseCase";

export class AddDeliverymanToDeliveryController {
  async handle(request: Request, response: Response) {
    const { id_delivery, id_deliveryman } = request.body;

    const addDeliverymanToDeliveryUseCase =
      new AddDeliverymanToDeliveryUseCase();

    await addDeliverymanToDeliveryUseCase.execute({
      id_delivery,
      id_deliveryman,
    });

    response.status(204).send();
  }
}
