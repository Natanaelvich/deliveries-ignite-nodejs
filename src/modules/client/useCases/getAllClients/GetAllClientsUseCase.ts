import { prisma } from "@prisma/client";
import prismaClient from "../../../../database";

export class GetAllClientsUseCase {
  async execute() {
    const clients = await prismaClient.client.findMany();

    return clients;
  }
}
