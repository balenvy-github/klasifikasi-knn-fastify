/*
  Warnings:

  - Added the required column `co` to the `Klasifikasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `no2` to the `Klasifikasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `o3` to the `Klasifikasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pm10` to the `Klasifikasi` table without a default value. This is not possible if the table is not empty.
  - Added the required column `so2` to the `Klasifikasi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `klasifikasi` ADD COLUMN `co` INTEGER NOT NULL,
    ADD COLUMN `no2` INTEGER NOT NULL,
    ADD COLUMN `o3` INTEGER NOT NULL,
    ADD COLUMN `pm10` INTEGER NOT NULL,
    ADD COLUMN `so2` INTEGER NOT NULL;
