/*
  Warnings:

  - A unique constraint covering the columns `[shortlink]` on the table `Upload` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Upload_shortlink_key" ON "Upload"("shortlink");
