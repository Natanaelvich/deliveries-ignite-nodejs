import prismaClient from "../../../../database";

interface IGetDeliverisDeliveryman {
  idDeliveryMan: string;
}

export class GetDeliverisDeliverymanUseCase {
  async execute({ idDeliveryMan }: IGetDeliverisDeliveryman) {
    const deliverisdeliveryman = await prismaClient.deliveryman.findFirst({
      where: {
        id: idDeliveryMan,
      },
      include: {
        Delivery: {
          select: { item_name: true, created_at: true, end_at: true },
        },
      },
    });

    return deliverisdeliveryman?.Delivery;
  }
}
