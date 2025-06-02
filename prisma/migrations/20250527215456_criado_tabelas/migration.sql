-- CreateEnum
CREATE TYPE "TipoAcessorio" AS ENUM ('PECA', 'ELETRONICO', 'ACABAMENTO', 'KIT_RODA');

-- CreateEnum
CREATE TYPE "CorVeiculo" AS ENUM ('PRETO', 'BRANCO', 'PRATA', 'VERMELHO', 'AZUL');

-- CreateEnum
CREATE TYPE "TipoCambio" AS ENUM ('AUTOMATICO', 'MANUAL');

-- CreateEnum
CREATE TYPE "StatusManutencao" AS ENUM ('pendente', 'finalizado');

-- CreateEnum
CREATE TYPE "StatusVeiculo" AS ENUM ('APROVADO', 'REPROVADO', 'EM_PRODUCAO');

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
CREATE TABLE "produto" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" "TipoAcessorio" NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produto_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "veiculos" (
    "id" TEXT NOT NULL,
    "modelo" TEXT NOT NULL,
<<<<<<<< HEAD:prisma/migrations/20250529120606_ajustado_campos/migration.sql
    "cor" "CorVeiculo" NOT NULL,
    "cambio" "TipoCambio" NOT NULL,
    "kitRodaId" TEXT,
    "status" "StatusVeiculo" NOT NULL DEFAULT 'EM_PRODUCAO',
========
    "fabricante" TEXT NOT NULL,
    "placa" TEXT NOT NULL,
    "anoFabricacao" INTEGER NOT NULL,
>>>>>>>> a2c7cc9d8ccd7612a29a980f601b59b09e467e4c:prisma/migrations/20250527215456_criado_tabelas/migration.sql
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "veiculos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "qualidade" (
    "id" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,
    "aprovado" BOOLEAN NOT NULL,
    "observacoes" TEXT,
    "motor" BOOLEAN NOT NULL,
    "pintura" BOOLEAN NOT NULL,
    "acabamentoInterno" BOOLEAN NOT NULL,
    "fluidos" BOOLEAN NOT NULL,
    "opcionais" BOOLEAN NOT NULL,
<<<<<<<< HEAD:prisma/migrations/20250529120606_ajustado_campos/migration.sql
========
    "numberOS" INTEGER NOT NULL,
>>>>>>>> a2c7cc9d8ccd7612a29a980f601b59b09e467e4c:prisma/migrations/20250527215456_criado_tabelas/migration.sql
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ordemDeServicoId" TEXT,

    CONSTRAINT "qualidade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ordens_de_servico" (
    "id" TEXT NOT NULL,
    "numberOS" TEXT NOT NULL,
    "veiculoId" TEXT NOT NULL,
    "qualidadeId" TEXT NOT NULL,
    "dataAbertura" TIMESTAMP(3) NOT NULL,
    "dataFechamento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ordens_de_servico_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "manutencao" (
    "id" TEXT NOT NULL,
    "ordemDeServicoId" TEXT NOT NULL,
    "dataServico" TIMESTAMP(3) NOT NULL,
    "observacoes" TEXT,
    "status" "StatusManutencao" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "qualidadeId" TEXT,
    "veiculoId" TEXT NOT NULL,

    CONSTRAINT "manutencao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "produtosUsados" (
    "id" TEXT NOT NULL,
    "manutencaoId" TEXT NOT NULL,
    "produtoId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "produtosUsados_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "qualidade_ordemDeServicoId_key" ON "qualidade"("ordemDeServicoId");

-- CreateIndex
CREATE UNIQUE INDEX "ordens_de_servico_numberOS_key" ON "ordens_de_servico"("numberOS");

-- CreateIndex
CREATE UNIQUE INDEX "ordens_de_servico_qualidadeId_key" ON "ordens_de_servico"("qualidadeId");

-- CreateIndex
CREATE UNIQUE INDEX "manutencao_ordemDeServicoId_key" ON "manutencao"("ordemDeServicoId");

-- CreateIndex
CREATE UNIQUE INDEX "manutencao_qualidadeId_key" ON "manutencao"("qualidadeId");

-- AddForeignKey
ALTER TABLE "veiculos" ADD CONSTRAINT "veiculos_kitRodaId_fkey" FOREIGN KEY ("kitRodaId") REFERENCES "produto"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "qualidade" ADD CONSTRAINT "qualidade_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_de_servico" ADD CONSTRAINT "ordens_de_servico_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ordens_de_servico" ADD CONSTRAINT "ordens_de_servico_qualidadeId_fkey" FOREIGN KEY ("qualidadeId") REFERENCES "qualidade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencao" ADD CONSTRAINT "manutencao_ordemDeServicoId_fkey" FOREIGN KEY ("ordemDeServicoId") REFERENCES "ordens_de_servico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "manutencao" ADD CONSTRAINT "manutencao_veiculoId_fkey" FOREIGN KEY ("veiculoId") REFERENCES "veiculos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtosUsados" ADD CONSTRAINT "produtosUsados_manutencaoId_fkey" FOREIGN KEY ("manutencaoId") REFERENCES "manutencao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "produtosUsados" ADD CONSTRAINT "produtosUsados_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "produto"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
