/*
  Warnings:

  - The primary key for the `delivery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `refreshDeliverymanToken` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `refreshclienttoken` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "delivery_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "delivery_id_seq";

-- AlterTable
ALTER TABLE "refreshDeliverymanToken" DROP CONSTRAINT "refreshDeliverymanToken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "refreshDeliverymanToken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "refreshDeliverymanToken_id_seq";

-- AlterTable
ALTER TABLE "refreshclienttoken" DROP CONSTRAINT "refreshclienttoken_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "refreshclienttoken_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "refreshclienttoken_id_seq";
