/*
  Warnings:

  - You are about to drop the column `excerpt` on the `BlogPost` table. All the data in the column will be lost.
  - You are about to drop the column `link` on the `BlogPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BlogPost" DROP COLUMN "excerpt",
DROP COLUMN "link";
