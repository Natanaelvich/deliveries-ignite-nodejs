import prismaClient from "../../../../database";
import AuthenticationProvider from "../../providers/AuthenticationProvider";
import RefreshTokenProvider from "../../providers/RefreshTokenProvider";

interface IAuthenticateClient {
  username: string;
  password: string;
}

export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prismaClient.client.findFirst({
      where: {
        username,
      },
    });

    if (!client) {
      throw new Error("Username or password invalid!");
    }

    const authenticationProvider = new AuthenticationProvider(client);

    const token = await authenticationProvider.execute({ password });

    const refreshTokenProvider = new RefreshTokenProvider(client);

    const refreshToken = await refreshTokenProvider.execute();

    await prismaClient.refreshClientToken.create({
      data: { id_client: client.id, token: refreshToken },
    });

    return {
      token,
      refreshToken,
      client: {
        id: client.id,
        username: client.username,
      },
    };
  }
}
