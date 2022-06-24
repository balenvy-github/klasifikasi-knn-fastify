-- CreateTable
CREATE TABLE `Klasifikasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `kategori` VARCHAR(191) NOT NULL,
    `sesuai` BOOLEAN NOT NULL DEFAULT true,
    `dataUjiId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Klasifikasi` ADD CONSTRAINT `Klasifikasi_dataUjiId_fkey` FOREIGN KEY (`dataUjiId`) REFERENCES `DataUji`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
