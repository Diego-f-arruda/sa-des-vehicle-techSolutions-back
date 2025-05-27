import { FastifyInstance, FastifyRequest } from "fastify";
import { CreateQualidadeBody, UpdateQualidadeBody } from "../types/Qualidade";
import { qualidadeService } from "../service/QualidadeService";

export async function qualidadeController(app: FastifyInstance) {


    app.post("/qualidade", async (request: FastifyRequest<{ Body: CreateQualidadeBody }>, reply) => {
        const body = request.body;
        try {
            const newQualidade = await qualidadeService.create(body);
            return reply.code(201).send(newQualidade);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });


    app.get("/qualidade", async (request: FastifyRequest, reply) => {
        try {
            const qualidades = await qualidadeService.getAll();
            return reply.code(200).send(qualidades);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ erro: "Erro interno do servidor em qualidade." });
        }
    });

    app.get("/qualidade/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply) => {
        const { id } = request.params;
        try {
            const qualidade = await qualidadeService.getById(id);
            if (!qualidade) {
                return reply.code(404).send({ erro: "Qualidade não encontrado." });
            }
            return reply.code(200).send(qualidade);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

    app.put("/qualidade/:id", async (request: FastifyRequest<{ Params: { id: string }, Body: UpdateQualidadeBody }>, reply) => {
        const { id } = request.params;
        const body = request.body;
        try {
            const updatedQualidade = await qualidadeService.update(id, body);
            return reply.code(200).send(updatedQualidade);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message });
        }
    });

}