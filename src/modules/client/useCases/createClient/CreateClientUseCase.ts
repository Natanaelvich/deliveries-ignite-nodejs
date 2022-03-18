import { hash } from "bcrypt";
import prismaClient from "../../../../database";

interface ICreateUser {
  username: string;
  password: string;
}

export class CreateUserUseCase {
  async execute({ password, username }: ICreateUser) {
    const clientExists = await prismaClient.client.findFirst({
      where: {
        username: {
          mode: "insensitive",
          equals : username
        },
      },
    });

    if (clientExists) {
      throw new Error("Client already exists");
    }

    const hashPassword = await hash(password, 10);

    const client = await prismaClient.client.create({
      data: { password: hashPassword, username },
    });

    return client;
  }
}
