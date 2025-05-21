/*
  Warnings:

  - Added the required column `createdAt` to the `acessoriosUsados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `acessoriosUsados` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `estoque` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `manutencao` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `qualidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `qualidade` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `veiculos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `veiculos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "acessoriosUsados" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "estoque" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "manutencao" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "qualidade" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "veiculos" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
