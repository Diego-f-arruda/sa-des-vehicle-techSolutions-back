import { PrismaClient, Veiculo, VeiculoStatus } from "@prisma/client";
import { prisma } from "../prisma/client";

class VehicleService {
    constructor(private prisma: PrismaClient) { }

    public async create(data: { modelo: string, fabricante: string, placa: string, anoFabricacao: number }): Promise<Veiculo> {
        const { modelo, fabricante, placa, anoFabricacao } = data;

        if (!modelo || typeof modelo !== 'string' || modelo.trim().length < 2) {
            throw new Error("Modelo do veículo inválido ou ausente.");
        }
        if (!fabricante || typeof fabricante !== 'string' || fabricante.trim().length < 2) {
            throw new Error("Fabricante do veículo inválido ou ausente.");
        }
        if (!placa || typeof placa !== 'string' || placa.trim().length !== 7) {
            throw new Error("Placa do veículo inválida. Deve ter 7 caracteres.");
        }
        if (typeof anoFabricacao !== 'number' || anoFabricacao < 1900 || anoFabricacao > new Date().getFullYear() + 1) {
            throw new Error("Ano de fabricação inválido.");
        }

        const existingVehicle = await this.prisma.veiculo.findUnique({
            where: { placa: placa.toUpperCase() },
        });

        if (existingVehicle) {
            throw new Error(`Veículo com a placa '${placa}' já cadastrado.`);
        }

        const newVehicle = await this.prisma.veiculo.create({
            data: {
                id: crypto.randomUUID(),
                modelo: modelo.trim(),
                fabricante: fabricante.trim(),
                placa: placa.toUpperCase(),
                anoFabricacao: anoFabricacao,
                status: VeiculoStatus.NOVO,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
        return newVehicle;
    }
    
    public async update(id: string, data: Partial<Veiculo>): Promise<Veiculo> {
        if (!id || typeof id !== 'string' || id.trim() === '') {
            throw new Error("ID do veículo inválido.");
        }
    
        if (Object.keys(data).length === 0) {
            throw new Error("Nenhum dado fornecido para atualização.");
        }
    
        if (data.placa) {
            data.placa = data.placa.toUpperCase();
        }
    
        if (data.anoFabricacao && (typeof data.anoFabricacao !== 'number' || data.anoFabricacao < 1900 || data.anoFabricacao > new Date().getFullYear() + 1)) {
            throw new Error("Ano de fabricação inválido para atualização.");
        }
    
        if (data.status && !Object.values(VeiculoStatus).includes(data.status)) {
            throw new Error(`Status de veículo inválido. Valores permitidos: ${Object.values(VeiculoStatus).join(', ')}`);
        }
    
        try {
            const updatedVehicle = await this.prisma.veiculo.update({
                where: { id },
                data: {
                    ...data,
                    updatedAt: new Date()
                },
            });
            return updatedVehicle;
    
        } catch (error: any) {
            if (error.code === 'P2025') {
                throw new Error(`Veículo com ID '${id}' não encontrado.`);
            }
    
            if (error.code === 'P2002' && error.meta?.target?.includes('placa')) {
                throw new Error(`Placa '${data.placa}' já está em uso por outro veículo.`);
            }
                throw new Error(`Erro ao atualizar veículo: ${error.message}`);
        }
    }
    
    public async getAll(): Promise<Veiculo[]> {
        return this.prisma.veiculo.findMany({
            orderBy: { modelo: 'asc' },
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