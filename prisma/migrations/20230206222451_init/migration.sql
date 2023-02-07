/*
  Warnings:

  - You are about to drop the column `orderId` on the `order` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[shopifyOrderId]` on the table `order` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shopifyOrderId` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "order_orderId_key";

-- AlterTable
ALTER TABLE "order" DROP COLUMN "orderId",
ADD COLUMN     "shopifyOrderId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "order_shopifyOrderId_key" ON "order"("shopifyOrderId");
