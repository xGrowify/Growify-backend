import { ApolloServer } from "@apollo/server";
import userScema from "../graphql/types/usertypes.js";
import userResolver from "../graphql/resolver/userResolver.js";
import { postResolver } from "../graphql/resolver/postResolver.js";
import postSchema from "../graphql/types/posttypes.js";
const Apolloserver = new ApolloServer({
  typeDefs: [userScema, postSchema], 
  resolvers: [userResolver, postResolver], 
});

export default Apolloserver;
