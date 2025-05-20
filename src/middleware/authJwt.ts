import fp from 'fastify-plugin';

export default fp(async (fastify) => {
    fastify.register(require("fastify-jwt"), {
        secret: process.env.JWT_SECRET
    })

    fastify.decorate("authenticate", async (request, reply) => {
        try {
            await request.jwtVerify();
        }catch(err){
            return reply.status(401).send({ error: "Não Autorizado"})
        }
    })
});