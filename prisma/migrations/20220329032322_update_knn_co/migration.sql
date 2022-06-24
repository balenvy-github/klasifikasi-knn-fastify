/*
  Warnings:

  - You are about to drop the column `co2` on the `knnklasifikasi` table. All the data in the column will be lost.
  - Added the required column `co` to the `KnnKlasifikasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `knnklasifikasi` DROP COLUMN `co2`,
    ADD COLUMN `co` INTEGER NOT NULL;
