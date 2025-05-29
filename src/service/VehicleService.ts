import { PrismaClient, Veiculo, StatusVeiculo, CorVeiculo, TipoCambio } from "@prisma/client";
import { prisma } from "../prisma/client";
import { CreateVeiculoBody } from "../types/Vehicle";

class VehicleService {
    constructor(private prisma: PrismaClient) { }

    public async create(data: CreateVeiculoBody): Promise<Veiculo> {
        const { modelo, cor, cambio, kitRodaId, status } = data;

        if (kitRodaId !== undefined && typeof kitRodaId !== 'string') {
            throw new Error("ID do Kit Roda inválido.");
        }

        if (!cor || !Object.values(CorVeiculo).includes(cor as CorVeiculo)) {
            throw new Error(`Cor de veículo inválida. Valores permitidos: ${Object.values(CorVeiculo).join(', ')}`);
        }
        
        const finalCor: CorVeiculo = cor as CorVeiculo; 

        if (!cambio || !Object.values(TipoCambio).includes(cambio as TipoCambio)) {
            throw new Error(`Tipo de câmbio inválido. Valores permitidos: ${Object.values(TipoCambio).join(', ')}`);
        }
        const finalCambio: TipoCambio = cambio as TipoCambio; 

        let finalStatus: StatusVeiculo | undefined = undefined;
        
        if (status !== undefined) {
            if (!Object.values(StatusVeiculo).includes(status as StatusVeiculo)) {
                throw new Error(`Status de veículo inválido. Valores permitidos: ${Object.values(StatusVeiculo).join(', ')}`);
            }
            finalStatus = status as StatusVeiculo; 
        }

        if (kitRodaId) {
            const kitRodaExists = await this.prisma.produto.findUnique({ where: { id: kitRodaId } });
            if (!kitRodaExists) {
                throw new Error(`Produto (Kit Roda) com ID '${kitRodaId}' não encontrado.`);
            }
            
        }

        const newVehicle = await this.prisma.veiculo.create({
            data: {
                id: crypto.randomUUID(),
                modelo,
                cor: finalCor,
                cambio: finalCambio,
                kitRodaId, 
                status: finalStatus, 
                createdAt: new Date()
            },
        });
        return newVehicle;
    }
    
    public async update(id: string, data: Partial<Veiculo>): Promise<Veiculo> {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error("ID do veículo inválido.");
        }
    
        if (data.cor !== undefined) {
            if (!Object.values(CorVeiculo).includes(data.cor as CorVeiculo)) {
                throw new Error(`Cor de veículo inválida para atualização. Valores permitidos: ${Object.values(CorVeiculo).join(', ')}`);
            }
          }

         if (Object.keys(data).length === 0) {
            throw new Error("Nenhum dado fornecido para atualização.");
        }

        if (data.cambio !== undefined) {
            if (!Object.values(TipoCambio).includes(data.cambio as TipoCambio)) {
                throw new Error(`Tipo de câmbio inválido para atualização. Valores permitidos: ${Object.values(TipoCambio).join(', ')}`);
            }
        }

        if (data.status !== undefined) {
            if (!Object.values(StatusVeiculo).includes(data.status as StatusVeiculo)) {
                throw new Error(`Status de veículo inválido para atualização. Valores permitidos: ${Object.values(StatusVeiculo).join(', ')}`);
            }
        }

        if (data.kitRodaId === null) {
            (data as any).kitRodaId = null; 
        } else if (data.kitRodaId !== undefined) { 
            if (typeof data.kitRodaId !== 'string') {
                throw new Error("ID do Kit Roda inválido para atualização.");
            }
            const kitRodaExists = await this.prisma.produto.findUnique({ where: { id: data.kitRodaId } });
            if (!kitRodaExists) {
                throw new Error(`Produto (Kit Roda) com ID '${data.kitRodaId}' não encontrado para atualização.`);
            }
        }

        try {
            const updatedVeiculo = await this.prisma.veiculo.update({
                where: { id },
                data: {
                    ...data,
                   cor: data.cor ? (data.cor as CorVeiculo) : undefined,
                    cambio: data.cambio ? (data.cambio as TipoCambio) : undefined,
                    status: data.status ? (data.status as StatusVeiculo) : undefined,
                }
            });
            
            return updatedVeiculo;

        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error(`Veículo com ID '${id}' não encontrado para atualização.`);
            }
            throw new Error(`Erro ao atualizar veículo: ${error.message}`);
        }
    }
    
    public async getAll(): Promise<Veiculo[]> {
        return this.prisma.veiculo.findMany({
            orderBy: { modelo: 'asc' },
            include: {
                kitRoda: true
            }
        });
    }
    
    public async getById(id: string): Promise<Veiculo | null> {
        
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error("ID do veículo inválido.");
        }
        
        return this.prisma.veiculo.findUnique({
            where: { id },
        });
    }
    
    
}

export const vehicleService = new VehicleService(prisma)