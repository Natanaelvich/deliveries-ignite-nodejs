-- CreateTable
CREATE TABLE "refreshDeliverymanToken" (
    "id" SERIAL NOT NULL,
    "id_deliveryman" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "refreshDeliverymanToken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refreshDeliverymanToken" ADD CONSTRAINT "refreshDeliverymanToken_id_deliveryman_fkey" FOREIGN KEY ("id_deliveryman") REFERENCES "deliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
