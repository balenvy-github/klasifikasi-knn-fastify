/*
  Warnings:

  - You are about to drop the column `sesuai` on the `klasifikasi` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `klasifikasi` DROP COLUMN `sesuai`,
    ADD COLUMN `konfirmasi` BOOLEAN NOT NULL DEFAULT false;
