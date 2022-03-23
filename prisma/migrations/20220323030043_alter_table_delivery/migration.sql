-- DropForeignKey
ALTER TABLE "delivery" DROP CONSTRAINT "delivery_id_deliveryman_fkey";

-- AlterTable
ALTER TABLE "delivery" ALTER COLUMN "id_deliveryman" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "delivery" ADD CONSTRAINT "delivery_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman"("id") ON DELETE SET NULL ON UPDATE CASCADE;
