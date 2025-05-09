-- CreateTable
CREATE TABLE "Coil" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "inviteOnly" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Coil_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Coil_slug_key" ON "Coil"("slug");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_coilId_fkey" FOREIGN KEY ("coilId") REFERENCES "Coil"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invitation" ADD CONSTRAINT "Invitation_coilId_fkey" FOREIGN KEY ("coilId") REFERENCES "Coil"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
