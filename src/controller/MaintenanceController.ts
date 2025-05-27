import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { CreateManutencaoBody, UpdateManutencaoBody } from "../types/Manutencao";
import { manutencaoService } from "../service/ManutencaoService";

export async function manutencaoController(app: FastifyInstance) {

    app.post("/manutencao", async (request: FastifyRequest<{ Body: CreateManutencaoBody }>, reply) => {
        const body = request.body;
        try {
            const newManutencao = await manutencaoService.create(body);
            return reply.code(201).send(newManutencao);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });
    
    app.get("/manutencao", async (request: FastifyRequest, reply) => {
        try {
            const manutencao = await manutencaoService.getAll();
            return reply.code(200).send(manutencao);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ erro: "Erro interno do servidor em manutencao." });
        }
    });

    app.get("/manutencao/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
        const { id } = request.params;
        try {
            const manutencao = await manutencaoService.getById(id);
            if (!manutencao) {
                return reply.code(404).send({ erro: "manutencao não encontrado." });
            }
            return reply.code(200).send(manutencao);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.put("/manutencao/:id", async (request: FastifyRequest<{ Params: { id: string }, Body: UpdateManutencaoBody }>, reply) => {
        const { id } = request.params;
        const body = request.body;
        try {
            const updatedmanutencao = await manutencaoService.update(id, body);
            return reply.code(200).send(updatedmanutencao);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

}