import { ApolloServer } from "@apollo/server";
import userScema from "../graphql/types/usertypes.js";
import userResolver from "../graphql/resolver/userResolver.js";

const Apolloserver = new ApolloServer({
  typeDefs: userScema,
  resolvers: userResolver,
});

export default Apolloserver;
