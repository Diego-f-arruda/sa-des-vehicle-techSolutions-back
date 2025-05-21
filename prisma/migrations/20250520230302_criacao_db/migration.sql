-- CreateEnum
CREATE TYPE "TipoAcessorio" AS ENUM ('PECA', 'ELETRONICO', 'ACABAMENTO');

-- CreateEnum
CREATE TYPE "StatusManutencao" AS ENUM ('pendente', 'finalizado');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acessorios" (
    "id" TEXT NOT NULL,

    CONSTRAINT "acessorios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "estoque" (
    "id" TEXT NOT NULL,
    "acessorioId" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoAcessorio" NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "estoque_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculos" (
    "id" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
    "fabricante" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "anoFabricacao" INTEGER NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qualidade" (
    "id" TEXT NOT NULL,
    "motor" BOOLEAN NOT NULL,
    "pintura" BOOLEAN NOT NULL,
    "acabamentoInterno" BOOLEAN NOT NULL,
    "fluidos" BOOLEAN NOT NULL,
    "opcionais" BOOLEAN NOT NULL,
    "numberOS" INTEGER NOT NULL,

    CONSTRAINT "qualidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manutencao" (
    "id" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,
    "dataServico" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT,
    "status" "StatusManutencao" NOT NULL,

    CONSTRAINT "manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "acessoriosUsados" (
    "id" TEXT NOT NULL,
    "manutencaoId" TEXT NOT NULL,
    "acessorioId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,

    CONSTRAINT "acessoriosUsados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "estoque_acessorioId_key" ON "estoque"("acessorioId");

-- CreateIndex
CREATE UNIQUE INDEX "veiculos_placa_key" ON "veiculos"("placa");

-- CreateIndex
CREATE UNIQUE INDEX "qualidade_numberOS_key" ON "qualidade"("numberOS");

-- AddForeignKey
ALTER TABLE "estoque" ADD CONSTRAINT "estoque_acessorioId_fkey" FOREIGN KEY ("acessorioId") REFERENCES "acessorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencao" ADD CONSTRAINT "manutencao_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acessoriosUsados" ADD CONSTRAINT "acessoriosUsados_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "manutencao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "acessoriosUsados" ADD CONSTRAINT "acessoriosUsados_acessorioId_fkey" FOREIGN KEY ("acessorioId") REFERENCES "acessorios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
