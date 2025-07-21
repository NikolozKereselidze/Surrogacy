/*
  Warnings:

  - You are about to drop the column `firstName` on the `DatabaseUser` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `DatabaseUser` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "DatabaseUser" DROP COLUMN "firstName",
DROP COLUMN "lastName";
