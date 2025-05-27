/*
  Warnings:

  - You are about to drop the `estoque` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "produtosUsados" DROP CONSTRAINT "produtosUsados_produtoId_fkey";

-- DropTable
DROP TABLE "estoque";

-- CreateTable
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoAcessorio" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "produtosUsados" ADD CONSTRAINT "produtosUsados_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
