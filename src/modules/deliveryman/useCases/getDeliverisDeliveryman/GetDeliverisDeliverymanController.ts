import { Request, Response } from "express";
import { GetDeliverisDeliverymanUseCase } from "./GetDeliverisDeliverymanUseCase";

export class GetDeliverisDeliverymanController {
  async handle(request: Request, response: Response) {
    const { idDeliveryMan } = request.params;

    const getDeliverisDeliverymanUseCase = new GetDeliverisDeliverymanUseCase();

    const deliverisdeliveryman = await getDeliverisDeliverymanUseCase.execute({
      idDeliveryMan,
    });

    return response.json(deliverisdeliveryman);
  }
}
