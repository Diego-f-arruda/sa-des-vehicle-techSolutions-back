import { PrismaClient, Produto, TipoAcessorio } from "@prisma/client"
import { prisma } from "../prisma/client"

class ProductService {
    constructor(private prisma: PrismaClient) { }
    public async create(nome: string, tipo: TipoAcessorio, quantidade: number): Promise<void> {

        if (!nome || typeof nome !== 'string' || nome.trim().length < 3) {
            throw new Error("Nome do produto inválido ou ausente. Deve ter pelo menos 3 caracteres.");
        }

        if (!Object.values(TipoAcessorio).includes(tipo)) {
            throw new Error(`Tipo de acessório inválido. Valores permitidos: ${Object.values(TipoAcessorio).join(', ')}`);
        }

        if (typeof quantidade !== 'number' || quantidade < 0) {
            throw new Error("Quantidade inválida. Deve ser um número não negativo.");
        }


        const productExists = await this.prisma.produto.findFirst({
            where: { nome: { equals: nome, mode: 'insensitive' } }, // Case-insensitive para nome
        });

        if (productExists) {
            throw new Error(`Produto com o nome '${nome}' já existe.`);
        }

        const produto: Produto = {
            id: crypto.randomUUID(),
            nome: nome,
            tipo: tipo,
            quantidade: quantidade,
            createdAt: new Date(),
            updatedAt: new Date()
        };
        await prisma.produto.create({ data: produto })
    }

    public async updateQuantidade(id: string, valor: number): Promise<Produto> {

        const valorAntigo = await this.prisma.produto.findUnique({
            where: { id },
            select: { quantidade: true }
        })

        if (!valorAntigo) {
            throw new Error("Produto não encontrado.");
        }

        const novaQuantidade = valorAntigo.quantidade + valor

        const updatedProduct = await this.prisma.produto.update({
            where: { id },
            data: {
                quantidade: novaQuantidade,
                updatedAt: new Date()
            }
        })

        if (updatedProduct == null) {
            throw new Error("Produto não encontrado")
        }


        return updatedProduct
    }

    public async updateQuantidadeUsada(id: string, valor: number): Promise<Produto> {

        if (typeof valor !== 'number' || valor < 0) { 
        throw new Error("Valor inválido. Deve ser um número não negativo.");
    }

        const valorAntigo = await this.prisma.produto.findUnique({
            where: { id },
            select: { quantidade: true }
        })

        if (!valorAntigo) {
            throw new Error("Produto não encontrado.");
        }

        const novaQuantidade = valorAntigo.quantidade - valor

        if ( novaQuantidade < 0){
            throw new Error("Não ha produtos suficientes.");
        }

        const updatedProduct = await this.prisma.produto.update({
            where: { id },
            data: {
                quantidade: novaQuantidade,
                updatedAt: new Date()
            }
        })

        return updatedProduct
    }

    public async getAll(): Promise<Produto[]> {
        return prisma.produto.findMany({
            orderBy: { nome: 'asc' }
        })


    };

}

export const productService = new ProductService(prisma);