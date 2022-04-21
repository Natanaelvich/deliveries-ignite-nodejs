import { Request, Response } from "express";
import { FinishDeliveryUseCase } from "./FinishDeliveryUseCase";

export class FinishDeliveryController {
  async handle(request: Request, response: Response) {
    const { id_delivery } = request.params;

    const finishDeliveryUseCase = new FinishDeliveryUseCase();

    await finishDeliveryUseCase.execute({ id_delivery });

    response.status(204).send();
  }
}
