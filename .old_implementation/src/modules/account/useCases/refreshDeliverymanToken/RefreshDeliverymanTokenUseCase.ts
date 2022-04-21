import { sign } from "jsonwebtoken";
import prismaClient from "../../../../database";

interface ICreateRefreshDeliveryman {
  id_deliveryman: string;
  token: string;
}

export class RefreshDeliverymanUseCase {
  async execute({ id_deliveryman, token }: ICreateRefreshDeliveryman) {
    const refreshDeliverymanExists =
      await prismaClient.refreshDeliverymanToken.findFirst({
        where: { token },
      });

    const deliverymanExists = await prismaClient.deliveryman.findFirst({
      where: { id: id_deliveryman },
    });

    if (!refreshDeliverymanExists) {
      throw new Error("Invalid token");
    }

    if (!deliverymanExists) {
      throw new Error("User not found");
    }

    await prismaClient.refreshDeliverymanToken.deleteMany({
      where: {
        id_deliveryman,
        token,
      },
    });

    const newRefreshToken = sign(
      { username: deliverymanExists.username },
      process.env.JWT_SECRET_REFRESH || "secret",
      { subject: id_deliveryman, expiresIn: process.env.JWT_EXPIRE_REFRESH }
    );

    const refreshDeliveryman = await prismaClient.refreshDeliverymanToken.create({
      data: { id_deliveryman, token: newRefreshToken },
    });

    return { refreshDeliveryman: refreshDeliveryman.token };
  }
}
