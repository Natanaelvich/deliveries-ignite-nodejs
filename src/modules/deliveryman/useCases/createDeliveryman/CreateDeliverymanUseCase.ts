import { hash } from "bcrypt";
import prismaClient from "../../../../database";

interface ICreateUser {
  username: string;
  password: string;
}

export class CreateDeliverymanUseCase {
  async execute({ password, username }: ICreateUser) {
    const clientExists = await prismaClient.deliveryman.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals: username,
        },
      },
    });

    console.log({ clientExists });
    if (clientExists) {
      throw new Error("Client already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prismaClient.deliveryman.create({
      data: { password: hashPassword, username },
    });

    return client;
  }
}
