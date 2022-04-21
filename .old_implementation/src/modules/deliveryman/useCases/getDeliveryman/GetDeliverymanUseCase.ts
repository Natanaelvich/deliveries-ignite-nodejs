import prismaClient from "../../../../database";

interface IGetDeliveryman {
  username: string;
}

export class GetDeliverymanUseCase {
  async execute({ username }: IGetDeliveryman) {
    const deliveryman = await prismaClient.deliveryman.findFirst({
      where: { username },
    });

    return deliveryman;
  }
}
