/*
  Warnings:

  - You are about to alter the column `hasil_uji` on the `dataujidetail` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.

*/
-- AlterTable
ALTER TABLE `dataujidetail` MODIFY `hasil_uji` INTEGER NOT NULL;
