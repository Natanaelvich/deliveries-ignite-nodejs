import { sign } from "jsonwebtoken";
import prismaClient from "../../../../database";

interface ICreateRefreshClientToken {
  id_client: string;
  token: string;
}

export class RefreshClientTokenUseCase {
  async execute({ id_client, token }: ICreateRefreshClientToken) {
    const refreshClientTokenExists =
      await prismaClient.refreshClientToken.findFirst({
        where: { token },
      });

    const clientExists = await prismaClient.client.findFirst({
      where: { id: id_client },
    });

    if (!refreshClientTokenExists) {
      throw new Error("Invalid token");
    }

    if (!clientExists) {
      throw new Error("User not found");
    }

    await prismaClient.refreshClientToken.deleteMany({
      where: {
        id_client,
        token,
      },
    });

    const newRefreshToken = sign(
      { username: clientExists.username },
      process.env.JWT_SECRET_REFRESH || "secret",
      { subject: id_client, expiresIn: process.env.JWT_EXPIRE_REFRESH }
    );

    const refreshClientToken = await prismaClient.refreshClientToken.create({
      data: { id_client, token: newRefreshToken },
    });

    return { refreshClientToken: refreshClientToken.token };
  }
}
