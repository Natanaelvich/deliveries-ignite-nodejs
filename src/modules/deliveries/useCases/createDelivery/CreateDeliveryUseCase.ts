import { Delivery } from "@prisma/client";
import prismaClient from "../../../../database";

export class CreateDeliveryUseCase {
  async execute(
    data: Pick<Delivery, "id_client" | "id_deliveryman" | "item_name">
  ) {
    const delivery = await prismaClient.delivery.create({
      data,
    });

    return delivery;
  }
}