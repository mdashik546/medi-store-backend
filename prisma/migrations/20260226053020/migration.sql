/*
  Warnings:

  - You are about to drop the column `description` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `companyId` on the `medicines` table. All the data in the column will be lost.
  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryName` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `medicines` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "medicines" DROP CONSTRAINT "medicines_companyId_fkey";

-- DropIndex
DROP INDEX "medicines_companyId_idx";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "description",
DROP COLUMN "name",
DROP COLUMN "slug",
DROP COLUMN "status",
ADD COLUMN     "categoryName" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "medicines" DROP COLUMN "companyId",
ALTER COLUMN "categoryId" SET NOT NULL;

-- DropTable
DROP TABLE "Company";

-- DropEnum
DROP TYPE "CategoryStatus";

-- AddForeignKey
ALTER TABLE "medicines" ADD CONSTRAINT "medicines_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
