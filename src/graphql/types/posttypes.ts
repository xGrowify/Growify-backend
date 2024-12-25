const postSchema = `#graphql

scalar Date

type Post {
    postId: String!
    title: String!
    content: String!
    published: Boolean!
    author: User!
    authodId: String!
    createdAt: Date
    updatedAt: Date
}



type Query{
    allposts:[Post],
    postById(postId: String!): Post
}

type Mutation{
    createPost(title: String!,content: String!,published: Boolean!,authorId: String!):Post
    updatePost(postId: String!,title: String!,content: String!,published: Boolean):Post
    deletePost(postId: String!):Post
}

`;

export default postSchema;
