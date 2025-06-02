
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { CreateProductBody, UpdateQuantityBody, UpdateQuantityParams } from "../types/Product";
import { productService } from "../service/ProductService";
import { TipoAcessorio } from '@prisma/client';

export async function productController(app: FastifyInstance) {

    app.post("/produto", async (request: FastifyRequest<{ Body: CreateProductBody }>, reply) => {
        const body = request.body

        try {
            await productService.create(body.nome, body.tipo, body.quantidade);
            return reply.code(201).send();
        } catch (error: any) {
            return reply.code(449).send({ erro: error.message })
        }
    })

    app.patch("/produto/:id/quantidade", async (request: FastifyRequest<{ Params: UpdateQuantityParams, Body: UpdateQuantityBody }>, reply) => {

        const { id } = request.params;
        const { valor } = request.body;

        try {
            const updatedProduct = await productService.updateQuantidade(id, valor);
            return reply.code(200).send(updatedProduct);
        } catch (error: any) {
            return reply.code(404).send({ error: error.message })
        }
    });

    app.patch("/produto/:id/quantidadeUsada", async (request: FastifyRequest<{ Params: UpdateQuantityParams, Body: UpdateQuantityBody }>, reply) => {

        const { id } = request.params;
        const { valor } = request.body;

        try {
            const updatedProduct = await productService.updateQuantidadeUsada(id, valor);
            return reply.code(200).send(updatedProduct);
        } catch (error: any) {
            return reply.code(404).send({ error: error.message })
        }
    });

    app.get("/produto", async (request: FastifyRequest, reply) => {

        try {
            const { tipo } = request.query as { tipo?: string };

            let tipoFiltrado: TipoAcessorio | undefined;

             if (tipo) {
                if (Object.values(TipoAcessorio).includes(tipo as TipoAcessorio)) {
                    tipoFiltrado = tipo as TipoAcessorio;
                } else {
                    return reply.code(400).send({ erro: `Tipo de produto inválido: ${tipo}. Valores permitidos: ${Object.values(TipoAcessorio).join(', ')}` });
                }
            }
                const products = await productService.getAll(tipoFiltrado)
                return reply.code(200).send(products);
            } catch (error: any) {
                return reply.code(400).send({ erro: error.message })
            }
        })

}