/*
  Warnings:

  - Added the required column `updatedAt` to the `DataUji` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `DataUjiDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `KnnKlasifikasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Lokasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Parameter` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Titik` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `datauji` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `dataujidetail` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `knnklasifikasi` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `lokasi` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `parameter` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;

-- AlterTable
ALTER TABLE `titik` ADD COLUMN `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
