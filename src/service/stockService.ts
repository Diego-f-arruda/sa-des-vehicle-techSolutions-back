import { Acessorio, Estoque, Estoque as EstoquePrisma, TipoAcessorio } from "@prisma/client"
import { prisma } from "../prisma/client"

class StockService {
    public async create(nome: string, tipo: TipoAcessorio, quantidade: number): Promise<void> {

        const acessorioId = crypto.randomUUID();
        await prisma.acessorio.create({
            data: {
                id: acessorioId,
            }
        });

        const stock: EstoquePrisma = {
            id: crypto.randomUUID(),
            acessorioId: acessorioId,
            nome: nome,
            tipo: tipo,
            quantidade: quantidade,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await prisma.estoque.create({ data: stock })
    }

    public async updateQuantidade(id: string, valor: number): Promise<EstoquePrisma> {
        const stock = await prisma.estoque.findUnique({ where: { id } })
        if (stock == null) {
            throw new Error("Produto não encontrado")
        }

        const stockUpdate = {
            quantidade: stock.quantidade + valor,
            updatedAt: new Date()
        }

        return await prisma.estoque.update({
            where: { id },  //sempre passar com where
            data: stockUpdate
        })
    }
}

export const stockService = new StockService();