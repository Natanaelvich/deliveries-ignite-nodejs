import prismaClient from "../../../../database";

interface IFinishDelivery {
  id_delivery: string;
}

export class FinishDeliveryUseCase {
  async execute({ id_delivery }: IFinishDelivery) {
    await prismaClient.delivery.update({
      where: { id: id_delivery },
      data: { end_at: new Date() },
    });
  }
}
