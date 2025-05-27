import { StatusManutencao } from "@prisma/client";

interface CreateManutencaoBody {
  ordemDeServicoId: string,
  dataServico: Date | string, 
  observacoes?: string,
  status: StatusManutencao, 
  qualidadeId?: string,
  veiculoId?: string,  produtosUsados?: CreateProdutoUsadoBody[]; 
}

interface UpdateManutencaoBody {
  ordemDeServicoId?: string;
  dataServico?: Date | string;
  observacoes?: string;
  status?: StatusManutencao;
  qualidadeId?: string;
  veiculoId?: string;
}

interface CreateProdutoUsadoBody {
  produtoId: string;
  quantidade: number;
}

interface UpdateProdutoUsadoBody {
  produtoId?: string;
  quantidade?: number;
}