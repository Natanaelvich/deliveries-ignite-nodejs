import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import Account from "../types/Account";

export default class AuthenticationProvider {
  constructor(private account: Account) {}

  async execute({ password }: { password: string }) {
    const { password: passwordAcctount, id, username } = this.account;

    const verifyPassword = await compare(password, passwordAcctount);

    if (!verifyPassword) {
      throw new Error("Username or password invalid!");
    }

    const token = sign(
      {
        username: username,
      },
      process.env.JWT_SECRET || "secret",
      { subject: id, expiresIn: process.env.JWT_EXPIRE }
    );

    return token;
  }
}
