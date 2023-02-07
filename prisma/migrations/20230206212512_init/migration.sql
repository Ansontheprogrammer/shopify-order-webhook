-- CreateTable
CREATE TABLE "order" (
    "id" SERIAL NOT NULL,
    "customerName" VARCHAR(99) NOT NULL,
    "orderDate" VARCHAR(99) NOT NULL,

    CONSTRAINT "order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItem" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(99) NOT NULL,
    "price" VARCHAR(99) NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "orderItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orderItemImages" (
    "id" SERIAL NOT NULL,
    "url" VARCHAR(99) NOT NULL,
    "orderItemId" INTEGER NOT NULL,

    CONSTRAINT "orderItemImages_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "orderItemImages" ADD CONSTRAINT "orderItemImages_orderItemId_fkey" FOREIGN KEY ("orderItemId") REFERENCES "orderItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
