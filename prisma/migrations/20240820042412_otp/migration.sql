-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" INTEGER,
ADD COLUMN     "otpExpirationTime" TIMESTAMP(3);
