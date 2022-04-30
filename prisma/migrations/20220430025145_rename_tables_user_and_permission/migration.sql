/*
  Warnings:

  - You are about to drop the `permissionsan` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `userliveryman` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_permissionName_fkey";

-- DropForeignKey
ALTER TABLE "user_permissions" DROP CONSTRAINT "user_permissions_userId_fkey";

-- DropTable
DROP TABLE "permissionsan";

-- DropTable
DROP TABLE "userliveryman";

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "user_username_key" ON "user"("username");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permissionName_fkey" FOREIGN KEY ("permissionName") REFERENCES "permissions"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
