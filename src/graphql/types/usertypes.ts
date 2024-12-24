const userScema = `#graphql

scalar Date

type User {
    userId: String!
    email:String
    password:String
    username: String

    bio: String
    createdAt: Date
    
}

type Query{
    users:[User],
    userByUsername(username: String!): User
  
}

type Mutation{
    createuser(email:String!,password:String!,username:String!,bio:String):User
}

`;
export default userScema;
