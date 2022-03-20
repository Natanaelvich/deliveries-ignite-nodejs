import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import prismaClient from "../../../../database";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prismaClient.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error("Username or password invalid!");
    }

    const verifyPassword = await compare(password, deliveryman.password);

    if (!verifyPassword) {
      throw new Error("Username or password invalid!");
    }

    const token = jwt.sign(
      {
        username: deliveryman.username,
      },
      process.env.JWT_SECRET || "secret",
      { subject: deliveryman.id, expiresIn: process.env.JWT_EXPIRE }
    );

    const refreshToken = jwt.sign(
      {
        username: deliveryman.username,
      },
      process.env.JWT_SECRET_REFRESH || "secret",
      { subject: deliveryman.id, expiresIn: process.env.JWT_EXPIRE_REFRESH }
    );

    await prismaClient.refreshDeliverymanToken.create({
      data: { id_deliveryman: deliveryman.id, token: refreshToken },
    });

    return {
      token,
      refreshToken,
      deliveryman: {
        id: deliveryman.id,
        username: deliveryman.username,
      },
    };
  }
}
