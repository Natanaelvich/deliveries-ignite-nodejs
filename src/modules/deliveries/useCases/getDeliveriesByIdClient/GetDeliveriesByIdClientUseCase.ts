import prismaClient from "../../../../database";

interface IGetDeliveriesByIdClient {
  id_client: string;
}

export class GetDeliveriesByIdClientUseCase {
  async execute({ id_client }: IGetDeliveriesByIdClient) {
    const deliveries = await prismaClient.delivery.findMany({
      where: {
        id_client,
      },
    });

    return deliveries;
  }
}
