/*
  Warnings:

  - Changed the type of `idreservation` on the `CartItem` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropIndex
DROP INDEX "public"."CartItem_idreservation_idx";

-- AlterTable
ALTER TABLE "public"."CartItem" DROP COLUMN "idreservation",
ADD COLUMN     "idreservation" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "addressLine" TEXT,
ADD COLUMN     "avatarUrl" TEXT,
ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT,
ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT,
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "postalCode" TEXT,
ADD COLUMN     "state" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_idreservation_key" ON "public"."CartItem"("idreservation");
