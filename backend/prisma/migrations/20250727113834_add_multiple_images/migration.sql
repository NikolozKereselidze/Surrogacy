/*
  Warnings:

  - You are about to drop the column `imagePath` on the `DatabaseUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DatabaseUser" DROP COLUMN "imagePath",
ADD COLUMN     "mainImagePath" TEXT;

-- CreateTable
CREATE TABLE "DonorImage" (
    "id" TEXT NOT NULL,
    "databaseUserId" TEXT NOT NULL,
    "imagePath" TEXT NOT NULL,
    "isMain" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DonorImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DonorImage" ADD CONSTRAINT "DonorImage_databaseUserId_fkey" FOREIGN KEY ("databaseUserId") REFERENCES "DatabaseUser"("id") ON DELETE CASCADE ON UPDATE CASCADE;
