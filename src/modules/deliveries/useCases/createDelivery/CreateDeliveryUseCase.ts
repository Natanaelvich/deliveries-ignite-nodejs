import prismaClient from "../../../../database";

interface ICreateDelivery {
  id_client: string;
  id_deliveryman?: string;
  item_name: string;
}
export class CreateDeliveryUseCase {
  async execute(data: ICreateDelivery) {
    const delivery = await prismaClient.delivery.create({
      data: { ...data, end_at: null },
    });

    return delivery;
  }
}
