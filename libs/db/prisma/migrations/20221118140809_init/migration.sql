/*
  Warnings:

  - The `isDeleted` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isPublished` column on the `Post` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isDeleted` column on the `PostCategory` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isDeleted` column on the `PostTag` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `isDeleted` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "PostTypeEnum" AS ENUM ('TRANSLATION', 'TRANSSHIPMENT', 'ORIGINAL');

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "type" "PostTypeEnum" NOT NULL DEFAULT 'ORIGINAL',
DROP COLUMN "isDeleted",
ADD COLUMN     "isDeleted" SMALLINT NOT NULL DEFAULT 0,
DROP COLUMN "isPublished",
ADD COLUMN     "isPublished" SMALLINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PostCategory" DROP COLUMN "isDeleted",
ADD COLUMN     "isDeleted" SMALLINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "PostTag" DROP COLUMN "isDeleted",
ADD COLUMN     "isDeleted" SMALLINT NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isDeleted",
ADD COLUMN     "isDeleted" SMALLINT NOT NULL DEFAULT 0;
