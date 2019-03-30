import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./db";
import { fragmentReplacements, resolvers } from "./resolvers/index";
import prisma from "./prisma";

const pubsub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context(request) {
    return {
      prisma,
      pubsub,
      db,
      request
    };
  },
  fragmentReplacements
});

server.start();
