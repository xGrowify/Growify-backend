import prisma from "../../lib/db";
type user = {
  id: string;
  email: string;
  password: string;
  username: string;
  bio: string;
  createdAt: Date;
};
const userResolver = {
  Query: {
    users: async () => {
      return await prisma.user.findMany();
    },
    userByUsername: async (_: any, { username }: { username: string }) => {
      return await prisma.user.findUnique({
        where: { username },
        select: {
          userId: true,
          email: true,
          username: true,
          bio: true,
          createdAt: true,
        },
      });
    },
  },
 
};

export default userResolver;
