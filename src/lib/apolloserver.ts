import { ApolloServer } from "@apollo/server";
import userScema from "../graphql/types/usertypes";
import userResolver from "../graphql/resolver/userResolver";

const Apolloserver = new ApolloServer({
  typeDefs: userScema,
  resolvers: userResolver,
});

export default Apolloserver;
