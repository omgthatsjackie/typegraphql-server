import { Arg, Mutation, Query, Resolver } from "type-graphql";
import bcrypt from "bcryptjs";
import { Users } from "../../entities/User";
import { RegisterInput } from "./register/RegisterInput";

@Resolver()
export class RegisterResolver {
  @Query(() => String)
  hello() {
    return "hi";
  }

  @Mutation(() => Users)
  async register(
    @Arg("data") { firstName, lastName, email, password }: RegisterInput
  ): Promise<Users> {
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await Users.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    }).save();

    return user;
  }
}
