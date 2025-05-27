import { TipoAcessorio } from "@prisma/client";

interface CreateProductBody {
  nome: string,
  tipo: TipoAcessorio,
  quantidade: number
}

interface UpdateQuantityParams {
  id: string;
}

interface UpdateQuantityBody {
  valor: number;
}