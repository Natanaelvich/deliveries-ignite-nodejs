import { Request, Response } from "express";
import { GetAllDeliverymanUseCase } from "./GetAllDeliverymanUseCase";

export class GetAllDeliverymanController {
  async handle(request: Request, response: Response) {
    const getAllDeliverymanUseCase = new GetAllDeliverymanUseCase();

    const deliverymans = await getAllDeliverymanUseCase.execute();

    response.json(deliverymans);
  }
}
