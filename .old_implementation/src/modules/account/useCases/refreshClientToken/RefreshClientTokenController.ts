import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { RefreshClientTokenUseCase } from "./RefreshClientTokenUseCase";

export class RefreshClientTokenController {
  async handle(request: Request, response: Response) {
    const { refreshToken } = request.body;

    const { sub } = verify(refreshToken, process.env.JWT_SECRET_REFRESH || "secret");

    if (typeof sub === "string") {
      const refreshClientTokenUseCase = new RefreshClientTokenUseCase();

      const refreshClientToken = await refreshClientTokenUseCase.execute({
        id_client: sub,
        token: refreshToken,
      });

      response.json(refreshClientToken);
    } else {
      response.status(401).json({ message: "Invalid Token" });
    }
  }
}
