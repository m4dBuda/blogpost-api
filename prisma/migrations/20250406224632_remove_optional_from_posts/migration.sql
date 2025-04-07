/*
  Warnings:

  - Made the column `content` on table `BlogPost` required. This step will fail if there are existing NULL values in that column.
  - Made the column `authorId` on table `BlogPost` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "BlogPost" DROP CONSTRAINT "BlogPost_authorId_fkey";

-- AlterTable
ALTER TABLE "BlogPost" ALTER COLUMN "content" SET NOT NULL,
ALTER COLUMN "authorId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "BlogPost" ADD CONSTRAINT "BlogPost_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
