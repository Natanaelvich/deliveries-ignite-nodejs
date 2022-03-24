import { Request, Response } from "express";
import { AddDeliverymanToDeliveryUseCase } from "./AddDeliverymanToDeliveryUseCase";

export class AddDeliverymanToDeliveryController {
  async handle(request: Request, response: Response) {
    const { idDelivery, idDeliveryman } = request.body;

    const addDeliverymanToDeliveryUseCase =
      new AddDeliverymanToDeliveryUseCase();

    await addDeliverymanToDeliveryUseCase.execute({
      idDelivery,
      idDeliveryman,
    });

    response.status(204).send();
  }
}
