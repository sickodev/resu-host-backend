/*
  Warnings:

  - You are about to drop the column `shortlink` on the `Upload` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Upload_shortlink_key";

-- AlterTable
ALTER TABLE "Upload" DROP COLUMN "shortlink";
