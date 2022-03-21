import { Request, Response } from "express";
import { GetDeliverymanUseCase } from "./GetDeliverymanUseCase";

export class GetDeliverymanController {
  async handle(request: Request, response: Response) {
    const { username } = request.body;

    const getDeliverymanUseCase = new GetDeliverymanUseCase();

    const deliveryman = await getDeliverymanUseCase.execute({ username });

    response.json(deliveryman);
  }
}
