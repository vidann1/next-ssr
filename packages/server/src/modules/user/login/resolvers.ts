import * as bcrypt from "bcryptjs";
import { getConnection } from "typeorm";

import { MutationResolvers } from "../../../types";
import { User } from "../../../entity/User";

const invalidLoginResponse = {
  errors: [
    {
      path: "password",
      message: "invalid login"
    }
  ],
  user: null
};

export const resolvers: MutationResolvers.Resolvers = {
  login: async (_, { input }, { req }) => {
    const user = await getConnection()
      .getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: input.usernameOrEmail })
      .orWhere("user.username = :username", { username: input.usernameOrEmail })
      .getOne();
    console.log(user);
    if (!user) {
      return invalidLoginResponse;
    }
    const valid = await bcrypt.compare(input.password, user.password);

    if (!valid) {
      return invalidLoginResponse;
    }

    req.session!.userId = user.id;

    return {
      errors: [],
      user
    };
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
