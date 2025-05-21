import { Acessorio, Estoque, Estoque as EstoquePrisma, TipoAcessorio } from "@prisma/client"
import { prisma } from "../prisma/client"

class StockService {
    public async create(acessorioId: Estoque, nome: string, tipo: TipoAcessorio, quantidade: number): Promise<void>{
        const stock: EstoquePrisma = {
            id: crypto.randomUUID(),
            acessorioId: acessorioId,
            nome: nome,
            tipo: tipo,
            quantidade: quantidade,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await prisma.estoque.create({ data: stock})
    }

    public async updateQuantidade(id: string): Promise<EstoquePrisma> {
        const stock = await prisma.estoque.findUnique({ where: { id } })
        if (stock == null) {
            throw new Error("Produto não encontrado")
        }

        const stockUpdate = {
            quantidade: !stock.quantidade,
            updatedAt: new Date()
        }

        return await prisma.estoque.update({
            where: { id },  //sempre passar com where
            data: stockUpdate
        })
    }
}

export const stockService = new StockService();