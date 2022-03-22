import prismaClient from "../../../../database";

interface IGetDeliveriesByIdDeliveryman {
  idDeliveryman: string;
}

export class GetDeliveriesByIdDeliverymanUseCase {
  async execute({ idDeliveryman }: IGetDeliveriesByIdDeliveryman) {
    const deliveries = await prismaClient.delivery.findMany({
      where: { id_deliveryman: idDeliveryman },
    });

    return deliveries;
  }
}
