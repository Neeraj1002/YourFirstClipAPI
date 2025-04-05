/*
  Warnings:

  - You are about to alter the column `type` on the `portfolio` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(0))` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `portfolio` MODIFY `type` ENUM('REEL', 'TVC', 'SOCIAL_MEDIA_AD', 'SHORT_FILM', 'DOCUMENTARY', 'MUSIC_VIDEO', 'CORPORATE_FILM', 'VLOG', 'PODCAST', 'BRANDED_CONTENT', 'TRAINING_VIDEO', 'YOUTUBE_INFLUENCERS_EDIT') NOT NULL DEFAULT 'REEL';
