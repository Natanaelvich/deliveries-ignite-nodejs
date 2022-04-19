import prismaClient from "../../../../database";

interface IAddDeliverymanToDelivery {
  id_deliveryman: string;
  id_delivery: string;
}

export class AddDeliverymanToDeliveryUseCase {
  async execute({ id_delivery, id_deliveryman }: IAddDeliverymanToDelivery) {
    await prismaClient.delivery.update({
      where: { id: id_delivery },
      data: { id_deliveryman },
    });
  }
}
