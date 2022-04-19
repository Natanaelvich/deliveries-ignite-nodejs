-- CreateTable
CREATE TABLE "refreshclienttoken" (
    "id" SERIAL NOT NULL,
    "id_client" TEXT NOT NULL,
    "token" TEXT NOT NULL,

    CONSTRAINT "refreshclienttoken_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "refreshclienttoken" ADD CONSTRAINT "refreshclienttoken_id_client_fkey" FOREIGN KEY ("id_client") REFERENCES "client"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
