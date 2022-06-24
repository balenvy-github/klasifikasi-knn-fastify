/*
  Warnings:

  - Added the required column `dataUjiId` to the `DataUjiDetail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `dataujidetail` ADD COLUMN `dataUjiId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `DataUjiDetail` ADD CONSTRAINT `DataUjiDetail_dataUjiId_fkey` FOREIGN KEY (`dataUjiId`) REFERENCES `DataUji`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
