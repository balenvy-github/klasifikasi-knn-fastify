/*
  Warnings:

  - You are about to alter the column `pengujian` on the `parameter` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `TinyInt`.

*/
-- AlterTable
ALTER TABLE `parameter` MODIFY `pengujian` BOOLEAN NOT NULL DEFAULT false;
