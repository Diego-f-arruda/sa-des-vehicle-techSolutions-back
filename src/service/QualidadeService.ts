import { PrismaClient, Qualidade } from "@prisma/client";
import { CreateQualidadeBody, UpdateQualidadeBody } from "../types/Qualidade";
import { prisma } from "../prisma/client";

class QualidadeService {
    constructor(private prisma: PrismaClient) { }

    public async create(data: CreateQualidadeBody): Promise<Qualidade> {
        const {
            veiculoId,
            aprovado,
            observacoes,
            motor,
            pintura,
            acabamentoInterno,
            fluidos,
            opcionais,
            numberOS,
            ordemDeServicoId,
        } = data;

        const veiculo = await this.prisma.veiculo.findUnique({ where: { id: veiculoId } });
        if (!veiculo) {
            throw new Error(`Veículo com ID '${veiculoId}' não encontrado.`);
        }

        if (typeof numberOS !== 'number' || numberOS <= 0) {
            throw new Error("Número da Ordem de Serviço (numberOS) inválido. Verifique se valor não esta negativo");
        }

        const existingQualidade = await this.prisma.qualidade.findUnique({
            where: { numberOS },
        });

        if (existingQualidade) {
            throw new Error(`Já existe um registro de qualidade para a Ordem de Serviço número '${numberOS}'.`);
        }

        const newQualidade = await this.prisma.qualidade.create({
            data: {
                id: crypto.randomUUID(),
                veiculoId: veiculoId,
                aprovado: aprovado,
                observacoes: observacoes,
                motor: motor,
                pintura: pintura,
                acabamentoInterno: acabamentoInterno,
                fluidos: fluidos,
                opcionais: opcionais,
                numberOS: numberOS,
                ordemDeServicoId: ordemDeServicoId,
                createdAt: new Date()
            },
        });
        return newQualidade;
    }

    public async getAll(): Promise<Qualidade[]> {
        return this.prisma.qualidade.findMany({
            orderBy: { createdAt: 'desc' },
            include: {
                veiculo: true,
                ordemDeServico: true
            }
        });
    }

    public async getById(id: string): Promise<Qualidade | null> {

        return this.prisma.qualidade.findUnique({
            where: { id },
            include: {
                veiculo: true,
                ordemDeServico: true,
            }
        });
    }

    public async update(id: string, data: UpdateQualidadeBody): Promise<Qualidade> {

        if (data.numberOS !== undefined && (typeof data.numberOS !== 'number' || data.numberOS <= 0)) {
            throw new Error("Número da Ordem de Serviço (numberOS) inválido para atualização.");
        }


        const updatedQualidade = await this.prisma.qualidade.update({
            where: { id },
            data: {
                ...data
            },
        });
        return updatedQualidade;
    }

}

export const qualidadeService = new QualidadeService(prisma);