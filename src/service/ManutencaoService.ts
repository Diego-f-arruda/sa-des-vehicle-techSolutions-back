import { Manutencao, PrismaClient, StatusManutencao } from "@prisma/client";
import { CreateManutencaoBody, UpdateManutencaoBody } from "../types/Manutencao";
import { prisma } from "../prisma/client";

class ManutencaoService {
    constructor(private prisma: PrismaClient) { }

    public async create(data: CreateManutencaoBody): Promise<Manutencao> {
        const {
            ordemDeServicoId,
            dataServico,
            observacoes,
            status,
            qualidadeId,
            veiculoId,
            produtosUsados
        } = data;

        const ordemExiste = await this.prisma.ordemDeServico.findUnique({ where: { id: ordemDeServicoId } });
        if (!ordemExiste) {
            throw new Error(`Ordem de Serviço com ID '${ordemDeServicoId}' não encontrada.`);
        }

        let finalDataServico: Date;
        if (dataServico === undefined) {
            finalDataServico = new Date();
        }

        if (!status || !Object.values(StatusManutencao).includes(status)) {
            throw new Error(`Status de manutenção inválido. Valores permitidos: ${Object.values(StatusManutencao).join(', ')}`);
        }

        if (observacoes !== undefined && typeof observacoes !== 'string') {
            throw new Error("Observações devem ser uma string.");
        }

        if (veiculoId !== undefined) {

            const veiculoExists = await this.prisma.veiculo.findUnique({ where: { id: veiculoId } });
            if (!veiculoExists) {
                throw new Error(`Veículo com ID '${veiculoId}' não encontrado.`);
            }
        }

        const existingManutencao = await this.prisma.manutencao.findUnique({
            where: { ordemDeServicoId: ordemDeServicoId },
        });
        if (existingManutencao) {
            throw new Error(`Já existe um registro de manutenção para a Ordem de Serviço com ID '${ordemDeServicoId}'.`);
        }

        const newManutencao = await this.prisma.$transaction(async (tx) => {
            //Lembrar de utilizar o transaction para garantir que todos os dados sejam alterados juntos 
            // ou nenhum deles ocorragarantindo assim a integridade do banco de dados
            const manutencao = await tx.manutencao.create({
                data: {
                    id: crypto.randomUUID(),
                    ordemDeServicoId: ordemDeServicoId,
                    dataServico: finalDataServico,
                    observacoes: observacoes,
                    status: status,
                    qualidadeId: qualidadeId,
                    veiculoId: veiculoId,
                    createdAt: new Date(),
                },
            });

            if (produtosUsados && produtosUsados.length > 0) {
                for (const item of produtosUsados) {

                    if (typeof item.quantidade !== 'number' || item.quantidade <= 0) {
                        throw new Error(`Quantidade para o produto '${item.produtoId}' inválida. Deve ser um número positivo.`);
                    }

                    const produto = await tx.produto.findUnique({ where: { id: item.produtoId } });
                    if (!produto) {
                        throw new Error(`Produto com ID '${item.produtoId}' não encontrado para uso.`);
                    }

                    if (produto.quantidade < item.quantidade) {
                        throw new Error(`Estoque insuficiente para o produto '${produto.nome}'. Disponível: ${produto.quantidade}, Requerido: ${item.quantidade}.`);
                    }

                    await tx.produtoUsado.create({
                        data: {
                            id: crypto.randomUUID(),
                            manutencaoId: manutencao.id,
                            produtoId: item.produtoId,
                            quantidade: item.quantidade,
                            createdAt: new Date(),
                        },
                    });

                    await tx.produto.update({
                        where: { id: item.produtoId },
                        data: {
                            quantidade: {
                                decrement: item.quantidade,
                            },
                            updatedAt: new Date(),
                        },
                    });
                }
            }
            return manutencao;
        });

        return newManutencao;
    }

    public async getAll(): Promise<Manutencao[]> {
        return this.prisma.manutencao.findMany({
            orderBy: { dataServico: 'desc' },
            include: {
                ordemDeServico: true,
                produtosUsados: {
                    include: {
                        produto: true
                    }
                },
                Veiculo: true,
            }
        });
    }

    public async getById(id: string): Promise<Manutencao | null> {

        return this.prisma.manutencao.findUnique({
            where: { id },
            include: {
                ordemDeServico: true,
                produtosUsados: {
                    include: {
                        produto: true
                    }
                },
                Veiculo: true,
            }
        });
    }

    public async update(id: string, data: UpdateManutencaoBody): Promise<Manutencao> {

        const ordemExiste = await this.prisma.ordemDeServico.findUnique({ where: { id: data.ordemDeServicoId } });
        if (!ordemExiste) {
            throw new Error(`Ordem de Serviço com ID '${data.ordemDeServicoId}' não encontrada para atualização.`);
        }



        if (data.status !== undefined && !Object.values(StatusManutencao).includes(data.status)) {
            throw new Error(`Status de manutenção inválido para atualização. Valores permitidos: ${Object.values(StatusManutencao).join(', ')}`);
        }

        const veiculoExists = await this.prisma.veiculo.findUnique({ where: { id: data.veiculoId } });
        if (!veiculoExists) {
            throw new Error(`Veículo com ID '${data.veiculoId}' não encontrado para atualização.`);
        }

        const updatedManutencao = await this.prisma.manutencao.update({
            where: { id },
            data: {
                ...data,
            },
        });
        return updatedManutencao;
    }
}

export const manutencaoService = new ManutencaoService(prisma);