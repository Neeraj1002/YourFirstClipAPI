/*
  Warnings:

  - The values [FEATURE_FILM] on the enum `portfolio_type` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `portfolio` MODIFY `type` ENUM('REELS', 'TVC', 'SOCIAL_MEDIA_ADS', 'SHORT_FILMS', 'DOCUMENTARY', 'MUSIC_VIDEO', 'CORPORATE_FILMS', 'VLOGS', 'PODCAST', 'BRANDED_CONTENT', 'TRAINING_VIDEO', 'YOUTUBE_INFLUENCERS_EDIT') NOT NULL;
