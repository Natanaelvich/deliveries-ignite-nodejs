import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prismaClient from "../../../../database";
import { RefreshClientTokenUseCase } from "../refreshClientToken/RefreshClientTokenUseCase";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prismaClient.client.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    const verifyPassword = await compare(password, client.password);

    if (!verifyPassword) {
      throw new Error("Username or password invalid!");
    }

    const token = jwt.sign(
      {
        username: client.username,
      },
      process.env.JWT_SECRET || "secret",
      { subject: client.id, expiresIn: process.env.JWT_EXPIRE }
    );

    const refreshToken = jwt.sign(
      {
        username: client.username,
      },
      process.env.JWT_SECRET_REFRESH || "secret",
      { subject: client.id, expiresIn: process.env.JWT_EXPIRE_REFRESH }
    );

    await prismaClient.refreshClientToken.create({
      data: { id_client: client.id, token },
    });

    return {
      token,
      refreshToken,
      client: {
        id: client.id,
        username: client.username,
      },
    };
  }
}
