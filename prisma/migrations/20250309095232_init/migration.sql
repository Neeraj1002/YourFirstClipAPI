/*
  Warnings:

  - You are about to drop the column `youtube_link` on the `portfolio` table. All the data in the column will be lost.
  - Added the required column `youTubeId` to the `portfolio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `portfolio` DROP COLUMN `youtube_link`,
    ADD COLUMN `youTubeId` VARCHAR(191) NOT NULL;
