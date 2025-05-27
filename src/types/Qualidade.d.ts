export interface CreateQualidadeBody {
  veiculoId: string;
  aprovado: boolean;
  observacoes?: string; 
  motor: boolean;
  pintura: boolean;
  acabamentoInterno: boolean;
  fluidos: boolean;
  opcionais: boolean;
  numberOS: number; 
  ordemDeServicoId?: string; 
}

export interface UpdateQualidadeBody {
  veiculoId?: string;
  aprovado?: boolean;
  observacoes?: string;
  motor?: boolean;
  pintura?: boolean;
  acabamentoInterno?: boolean;
  fluidos?: boolean;
  opcionais?: boolean;
  numberOS?: number;
  ordemDeServicoId?: string;
}