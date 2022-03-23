import prismaClient from "../../../../database";

interface IGetDeliveriesByIdClient {
  idClient: string;
}

export class GetDeliveriesByIdClientUseCase {
  async execute({ idClient }: IGetDeliveriesByIdClient) {
    const deliveries = await prismaClient.delivery.findMany({
      where: {
        id_client: idClient,
      },
    });

    return deliveries;
  }
}
