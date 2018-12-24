import * as bcrypt from "bcryptjs";
import * as yup from "yup";

import { MutationResolvers } from "../../../types";
import { User } from "../../../entity/User";

export const resolvers: MutationResolvers.Resolvers = {
  register: async (
    _,
    { input: { username, firstName, lastName, email, password } }
  ) => {
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      await User.create({
        email,
        firstName,
        lastName,
        username,
        password: hashedPassword
      }).save();
    } catch (err) {
      console.log(err);
      /*
      const { detail } = err;
      if (detail.includes("already exists.")) {
        if (detail.includes("email")) {
          return {
            errors: [
              {
                path: "email",
                message: "email already in use"
              }
            ]
          };
        } else if (detail.includes("username")) {
          return {
            errors: [
              {
                path: "username",
                message: "already taken"
              }
            ]
          };
        }
	  }
	  */
    }

    return {
      errors: []
    };
  }
};

export default {
  Mutation: {
    ...resolvers
  }
};
