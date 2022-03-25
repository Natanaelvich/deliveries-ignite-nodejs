import prismaClient from "../../../../database";

interface IGetDeliveriesByIdDeliveryman {
  id_deliveryman: string;
}

export class GetDeliveriesByIdDeliverymanUseCase {
  async execute({ id_deliveryman }: IGetDeliveriesByIdDeliveryman) {
    const deliveries = await prismaClient.delivery.findMany({
      where: { id_deliveryman },
    });

    return deliveries;
  }
}
