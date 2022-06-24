-- CreateTable
CREATE TABLE `HasilUjiSalah` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pm10` INTEGER NOT NULL,
    `so2` INTEGER NOT NULL,
    `co` INTEGER NOT NULL,
    `o3` INTEGER NOT NULL,
    `no2` INTEGER NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `knn` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `hasilTrainingId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `HasilUjiSalah` ADD CONSTRAINT `HasilUjiSalah_hasilTrainingId_fkey` FOREIGN KEY (`hasilTrainingId`) REFERENCES `HasilTraining`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
