import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { RefreshDeliverymanUseCase } from "./RefreshDeliverymanTokenUseCase";

export class RefreshDeliverymanTokenController {
  async handle(request: Request, response: Response) {
    const { refreshToken } = request.body;

    const { sub } = verify(refreshToken, process.env.JWT_SECRET_REFRESH || "secret");

    if (typeof sub === "string") {
      const refreshDeliverymanUseCase = new RefreshDeliverymanUseCase();

      const refreshDeliverymanToken = await refreshDeliverymanUseCase.execute({
        id_deliveryman: sub,
        token: refreshToken,
      });

      response.json(refreshDeliverymanToken);
    } else {
      response.status(401).json({ message: "Invalid Token" })
    }
  }
}
