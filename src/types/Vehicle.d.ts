import { VeiculoStatus } from "@prisma/client";

export interface CreateVeiculoBody {
    modelo: string;
    cor: CorVeiculo | string; 
    cambio: TipoCambio | string; 
    kitRodaId?: string; 
    status?: StatusVeiculo | string;
}

export interface UpdateVehicleBody {
  modelo?: string;
    cor?: CorVeiculo | string;
    cambio?: TipoCambio | string;
    kitRodaId?: string | null;
  status?: VeiculoStatus; 
}