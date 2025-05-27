-- AlterTable
ALTER TABLE "estoque" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "manutencao" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "ordens_de_servico" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "produtosUsados" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "qualidade" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "createdAt" DROP DEFAULT;

-- AlterTable
ALTER TABLE "veiculos" ALTER COLUMN "createdAt" DROP DEFAULT;
