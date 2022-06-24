-- CreateTable
CREATE TABLE `HasilTraining` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `jumlah_data` INTEGER NOT NULL,
    `jumlah_data_train` INTEGER NOT NULL,
    `jumlah_data_test` INTEGER NOT NULL,
    `jumlah_data_test_benar` INTEGER NOT NULL,
    `jumlah_data_test_salah` INTEGER NOT NULL,
    `akurasi` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
