import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import * as express from "express";
import * as session from "express-session";
import * as connectRedis from "connect-redis";
// import { createTypeormConn } from "./createTypeormConn";
import { createConnection } from "typeorm";
import { createSchema } from "./createSchema";
import { redis } from "./redis";
import * as cors from "cors";

const SESSION_SECRET = "ajslkjalksjdfkl";
const RedisStore = connectRedis(session);

const startServer = async () => {
  const createTypeormConn = () => createConnection();
  await createTypeormConn();

  const corsOptions = {
    credentials: true,
    origin: "http://localhost:3000"
  };

  const app = express();

  app.use(cors(corsOptions));

  app.use(
    session({
      store: new RedisStore({
        client: redis as any
        // prefix: redisSessionPrefix
      }),
      secret: SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 365 * 7 // 7 days
      }
    })
  );

  const server = new ApolloServer({
    schema: createSchema(),
    context: ({ req }: any) => ({ req })
  });

  server.applyMiddleware({
    app,
    cors: false
  }); // app is from an existing express app

  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
