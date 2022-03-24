import prismaClient from "../../../../database";

interface IAddDeliverymanToDelivery {
  idDeliveryman: string;
  idDelivery: string;
}

export class AddDeliverymanToDeliveryUseCase {
  async execute({ idDelivery, idDeliveryman }: IAddDeliverymanToDelivery) {
    await prismaClient.delivery.update({
      where: { id: idDelivery },
      data: { id_deliveryman: idDeliveryman },
    });
  }
}
