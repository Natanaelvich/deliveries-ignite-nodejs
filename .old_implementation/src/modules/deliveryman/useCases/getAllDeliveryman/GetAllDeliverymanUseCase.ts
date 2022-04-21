import prismaClient from "../../../../database";

export class GetAllDeliverymanUseCase {
  async execute() {
    const deliverymans = await prismaClient.deliveryman.findMany();

    return deliverymans;
  }
}
