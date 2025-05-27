import { VeiculoStatus } from "@prisma/client";

export interface CreateVehicleBody {
  modelo: string;
  fabricante: string;
  placa: string;
  anoFabricacao: number;
}

export interface UpdateVehicleBody {
  modelo?: string;
  fabricante?: string;
  placa?: string;
  anoFabricacao?: number;
  status?: VeiculoStatus; 
}