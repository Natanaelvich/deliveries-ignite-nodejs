import prismaClient from "../../../../database";
import AuthenticationProvider from "../../providers/AuthenticationProvider";
import RefreshTokenProvider from "../../providers/RefreshTokenProvider";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}

export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prismaClient.deliveryman.findFirst({
      where: {
        username,
      },
    });

    if (!deliveryman) {
      throw new Error("Username or password invalid!");
    }

    const authenticationProvider = new AuthenticationProvider(deliveryman);

    const token = await authenticationProvider.execute({ password });

    const refreshTokenProvider = new RefreshTokenProvider(deliveryman);

    const refreshToken = await refreshTokenProvider.execute();

    await prismaClient.refreshDeliverymanToken.create({
      data: { id_deliveryman: deliveryman.id, token: refreshToken },
    });

    return {
      token,
      refreshToken,
      deliveryman: {
        id: deliveryman.id,
        username: deliveryman.username,
      },
    };
  }
}
