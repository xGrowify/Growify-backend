/*
  Warnings:

  - The primary key for the `FreelanceGigCreate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `PitchProject` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Post` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `SocialMediaLink` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "FreelanceGigApply" DROP CONSTRAINT "FreelanceGigApply_freelanceGigId_fkey";

-- AlterTable
ALTER TABLE "FreelanceGigApply" ALTER COLUMN "freelanceGigId" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "FreelanceGigCreate" DROP CONSTRAINT "FreelanceGigCreate_pkey",
ALTER COLUMN "gigId" DROP DEFAULT,
ALTER COLUMN "gigId" SET DATA TYPE TEXT,
ADD CONSTRAINT "FreelanceGigCreate_pkey" PRIMARY KEY ("gigId");
DROP SEQUENCE "FreelanceGigCreate_gigId_seq";

-- AlterTable
ALTER TABLE "PitchProject" DROP CONSTRAINT "PitchProject_pkey",
ALTER COLUMN "projectId" DROP DEFAULT,
ALTER COLUMN "projectId" SET DATA TYPE TEXT,
ADD CONSTRAINT "PitchProject_pkey" PRIMARY KEY ("projectId");
DROP SEQUENCE "PitchProject_projectId_seq";

-- AlterTable
ALTER TABLE "Post" DROP CONSTRAINT "Post_pkey",
ALTER COLUMN "postId" DROP DEFAULT,
ALTER COLUMN "postId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("postId");
DROP SEQUENCE "Post_postId_seq";

-- AlterTable
ALTER TABLE "SocialMediaLink" DROP CONSTRAINT "SocialMediaLink_pkey",
ALTER COLUMN "linkId" DROP DEFAULT,
ALTER COLUMN "linkId" SET DATA TYPE TEXT,
ADD CONSTRAINT "SocialMediaLink_pkey" PRIMARY KEY ("linkId");
DROP SEQUENCE "SocialMediaLink_linkId_seq";

-- AddForeignKey
ALTER TABLE "FreelanceGigApply" ADD CONSTRAINT "FreelanceGigApply_freelanceGigId_fkey" FOREIGN KEY ("freelanceGigId") REFERENCES "FreelanceGigCreate"("gigId") ON DELETE RESTRICT ON UPDATE CASCADE;
