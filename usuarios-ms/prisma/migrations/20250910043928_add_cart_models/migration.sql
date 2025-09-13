-- CreateTable
CREATE TABLE "public"."Cart" (
    "id" SERIAL NOT NULL,
    "iduser" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CartItem" (
    "id" SERIAL NOT NULL,
    "idcart" INTEGER NOT NULL,
    "idproduct" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "idreservation" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CartItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_iduser_key" ON "public"."Cart"("iduser");

-- CreateIndex
CREATE INDEX "Cart_updatedAt_idx" ON "public"."Cart"("updatedAt");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_idreservation_key" ON "public"."CartItem"("idreservation");

-- CreateIndex
CREATE INDEX "CartItem_idcart_idx" ON "public"."CartItem"("idcart");

-- CreateIndex
CREATE INDEX "CartItem_idreservation_idx" ON "public"."CartItem"("idreservation");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_idcart_idproduct_key" ON "public"."CartItem"("idcart", "idproduct");

-- CreateIndex
CREATE INDEX "User_email_idx" ON "public"."User"("email");

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "public"."User"("isActive");

-- AddForeignKey
ALTER TABLE "public"."Cart" ADD CONSTRAINT "Cart_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CartItem" ADD CONSTRAINT "CartItem_idcart_fkey" FOREIGN KEY ("idcart") REFERENCES "public"."Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;
