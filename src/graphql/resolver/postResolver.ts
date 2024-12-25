import prisma from "../../lib/db.js";

export const postResolver = {
  Query: {
    allposts: async () => {
      return await prisma.post.findMany({
        include: {
          author: true,
        },
      });
    },
    postById: async (_: any, args: { postId: string }) => {
      return await prisma.post.findUnique({
        where: { postId: args.postId },
        include: { author: true },
      });
    },
  },

  Mutation: {
    createPost: async (
      _: any,
      args: { title: string; content: string; authorId: string }
    ) => {
      const { title, content, authorId } = args;

      // Basic Validation
      if (!title || title.trim() === "") {
        throw new Error("Title is required and cannot be empty.");
      }
      if (!content || content.trim() === "") {
        throw new Error("Content is required and cannot be empty.");
      }
      if (!authorId) {
        throw new Error("Author ID is required.");
      }

      try {
        // Check if author exists
        const author = await prisma.user.findUnique({
          where: { userId: authorId },
        });
        if (!author) {
          throw new Error("Author not found.");
        }

        // Create the post
        const post = await prisma.post.create({
          data: {
            title,
            content,
            authorId,
          },
        });

        return post;
      } catch (error) {
        console.error("Error creating post:", error);
        throw new Error("Failed to create the post.");
      }
    },
  
  updatePost: async (
    _: any,
    args: { postId: string; title: string; content: string; published: boolean }
  ) => {
    const { postId, title, content, published } = args;
  
    if (!postId) {
      throw new Error('Post ID is required.');
    }
    if (title && title.trim() === '') {
      throw new Error('Title cannot be empty.');
    }
    if (content && content.trim() === '') {
      throw new Error('Content cannot be empty.');
    }
  
    try {
      // Check if post exists
      const existingPost = await prisma.post.findUnique({
        where: { postId },
      });
      if (!existingPost) {
        throw new Error('Post not found.');
      }
  
      // Update the post
      const updatedPost = await prisma.post.update({
        where: { postId },
        data: { title, content, published },
      });
  
      return updatedPost;
    } catch (error) {
      console.error('Error updating post:', error);
      throw new Error('Failed to update the post.');
    }
  },
  
  deletePost: async (_: any, args: { postId: string }) => {
    return await prisma.post.delete({
      where: { postId: args.postId },
    });
  },
},
};
