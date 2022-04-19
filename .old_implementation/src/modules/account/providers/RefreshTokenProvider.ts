import { sign } from "jsonwebtoken";
import Account from "../types/Account";

export default class RefreshTokenProvider {
  constructor(
    private account: Account,
  ) {}

  async execute() {
    const { id, username } = this.account;

    const refreshToken = sign(
      {
        username: username,
      },
      process.env.JWT_SECRET_REFRESH || "secret",
      { subject: id, expiresIn: process.env.JWT_EXPIRE_REFRESH }
    );

    return refreshToken;
  }
}
