import { Request, Response } from "express";
import { CreateDeliveryUseCase } from "./CreateDeliveryUseCase";

export class CreateDeliveryController {
  async handle(request: Request, response: Response) {
    const { id } = request;

    const { id_deliveryman, item_name } = request.body;

    const createDeliveryUseCase = new CreateDeliveryUseCase();

    const delivery = await createDeliveryUseCase.execute({
      id_client: id,
      id_deliveryman,
      item_name,
    });

    response.json(delivery);
  }
}
