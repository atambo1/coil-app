/*
  Warnings:

  - You are about to drop the column `choseLove` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `hasBaptized` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "choseLove",
DROP COLUMN "hasBaptized",
ADD COLUMN     "coil" TEXT,
ADD COLUMN     "token" TEXT,
ADD COLUMN     "tokenExpires" TIMESTAMP(3),
ALTER COLUMN "nickname" DROP NOT NULL,
ALTER COLUMN "scrollIndex" DROP NOT NULL,
ALTER COLUMN "scrollIndex" DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX "User_token_key" ON "User"("token");
