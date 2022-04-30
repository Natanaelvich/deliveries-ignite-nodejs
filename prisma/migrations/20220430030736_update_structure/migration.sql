/*
  Warnings:

  - You are about to drop the column `id_client` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the column `id_deliveryman` on the `delivery` table. All the data in the column will be lost.
  - You are about to drop the `client` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `deliveryman` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `refreshDeliverymanToken` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `refreshclienttoken` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `id_user_client` to the `delivery` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_id_client_fkey";

-- DropForeignKey
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_id_deliveryman_fkey";

-- DropForeignKey
ALTER TABLE "refreshDeliverymanToken" DROP CONSTRAINT "refreshDeliverymanToken_id_deliveryman_fkey";

-- DropForeignKey
ALTER TABLE "refreshclienttoken" DROP CONSTRAINT "refreshclienttoken_id_client_fkey";

-- AlterTable
ALTER TABLE "delivery" DROP COLUMN "id_client",
DROP COLUMN "id_deliveryman",
ADD COLUMN     "id_user_client" TEXT NOT NULL;

-- DropTable
DROP TABLE "client";

-- DropTable
DROP TABLE "deliveryman";

-- DropTable
DROP TABLE "refreshDeliverymanToken";

-- DropTable
DROP TABLE "refreshclienttoken";

-- CreateTable
CREATE TABLE "refreshtoken" (
    "id" TEXT NOT NULL,
    "id_user" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "refreshtoken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_id_user_client_fkey" FOREIGN KEY ("id_user_client") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "refreshtoken" ADD CONSTRAINT "refreshtoken_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
