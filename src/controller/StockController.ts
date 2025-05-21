import { TipoAcessorio } from "@prisma/client";
import { FastifyInstance, FastifyReply, FastifyRequest  } from "fastify";
import { stockService } from "../service/stockService";


export async function stockController(app: FastifyInstance){

    app.post("/stock", async (request: FastifyRequest, reply) => {
        const body = request.body as { 
            nome: string, 
            tipoAcessorio: TipoAcessorio, 
            quantidade: number};
        console.log(body)
        

        try {
            await stockService.create( body.nome, body.tipoAcessorio, body.quantidade);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(449).send({ erro: error.message })
        }
    })

    app.patch("/stock/:id/quantidade",  async(request, reply) => {
      
        const { id } = request.params as { id: string };
        const body = request.body as { valor: number };
        
        try {
            const stock = await stockService.updateQuantidade(id, body.valor);
            return reply.code(200).send(stock);
        }catch(error: any) {
            return reply.code(404).send({ error: error.message})
        }
    });

}