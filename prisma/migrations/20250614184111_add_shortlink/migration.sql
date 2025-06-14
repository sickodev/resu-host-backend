/*
  Warnings:

  - A unique constraint covering the columns `[shortlink]` on the table `Upload` will be added. If there are existing duplicate values, this will fail.
  - Made the column `shortlink` on table `Upload` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Upload" ALTER COLUMN "shortlink" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Upload_shortlink_key" ON "Upload"("shortlink");
