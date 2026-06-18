/*
  Warnings:

  - Added the required column `eyeColor` to the `DatabaseUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hairColor` to the `DatabaseUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `livingSituation` to the `DatabaseUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationshipStatus` to the `DatabaseUser` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DatabaseUser" ADD COLUMN     "children" TEXT,
ADD COLUMN     "eyeColor" TEXT NOT NULL,
ADD COLUMN     "hairColor" TEXT NOT NULL,
ADD COLUMN     "livingSituation" TEXT NOT NULL,
ADD COLUMN     "relationshipStatus" TEXT NOT NULL;
