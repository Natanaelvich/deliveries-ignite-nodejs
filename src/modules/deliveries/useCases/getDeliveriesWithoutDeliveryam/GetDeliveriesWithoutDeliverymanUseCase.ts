import prismaClient from "../../../../database";

export class GetDeliveriesWithoutDeliverymanUseCase {
  async execute() {
    const deliveries = await prismaClient.delivery.findMany({
      where: { id_deliveryman: null },
    });

    return deliveries;
  }
}
