/*
  Warnings:

  - Added the required column `pengujian` to the `Parameter` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `parameter` ADD COLUMN `pengujian` VARCHAR(191) NOT NULL;
