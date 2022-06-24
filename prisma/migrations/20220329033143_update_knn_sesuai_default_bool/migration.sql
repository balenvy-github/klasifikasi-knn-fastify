/*
  Warnings:

  - You are about to alter the column `sesuai` on the `knnklasifikasi` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `knnklasifikasi` MODIFY `sesuai` BOOLEAN NOT NULL DEFAULT true;
