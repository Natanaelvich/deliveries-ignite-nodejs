-- CreateTable
CREATE TABLE "userliveryman" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "userliveryman_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissionsan" (
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "user_permissions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "permissionName" TEXT NOT NULL,

    CONSTRAINT "user_permissions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "userliveryman_username_key" ON "userliveryman"("username");

-- CreateIndex
CREATE UNIQUE INDEX "permissionsan_name_key" ON "permissionsan"("name");

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "userliveryman"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "user_permissions" ADD CONSTRAINT "user_permissions_permissionName_fkey" FOREIGN KEY ("permissionName") REFERENCES "permissionsan"("name") ON DELETE RESTRICT ON UPDATE CASCADE;
