-- CreateTable
CREATE TABLE `Parameter` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parameter` VARCHAR(191) NOT NULL,
    `baku_mutu` VARCHAR(191) NOT NULL,
    `satuan` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Lokasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_lokasi` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Titik` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nama_titik` VARCHAR(255) NOT NULL,
    `koordinat` VARCHAR(255) NOT NULL,
    `lokasiId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataUji` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nomor_uji` VARCHAR(191) NOT NULL,
    `tahun` INTEGER NOT NULL,
    `bulan` INTEGER NOT NULL,
    `titikId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `DataUjiDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hasil_uji` VARCHAR(191) NOT NULL,
    `parameterId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `KnnKlasifikasi` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pm10` INTEGER NOT NULL,
    `pm25` INTEGER NOT NULL,
    `so2` INTEGER NOT NULL,
    `co2` INTEGER NOT NULL,
    `o3` INTEGER NOT NULL,
    `no2` INTEGER NOT NULL,
    `kategori` VARCHAR(191) NOT NULL,
    `sesuai` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Titik` ADD CONSTRAINT `Titik_lokasiId_fkey` FOREIGN KEY (`lokasiId`) REFERENCES `Lokasi`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataUji` ADD CONSTRAINT `DataUji_titikId_fkey` FOREIGN KEY (`titikId`) REFERENCES `Titik`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `DataUjiDetail` ADD CONSTRAINT `DataUjiDetail_parameterId_fkey` FOREIGN KEY (`parameterId`) REFERENCES `Parameter`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
