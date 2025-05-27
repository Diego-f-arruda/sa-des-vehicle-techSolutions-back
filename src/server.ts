import fastify from "fastify";
import cors from "@fastify/cors";
import { userController } from "./controller/UserController";
import authJwt from "./middleware/authJwt";
import fastifySwagger from "@fastify/swagger";
import { swaggerConfig } from "./config/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { productController } from "./controller/ProductController";
import { vehicleController } from "./controller/VehicleController";
import { qualidadeController } from "./controller/QualityContoller";
import { manutencaoController } from "./controller/MaintenanceController";

const app = fastify();

app.register(cors, {
    origin: true,
    methods: ["GET", "POST", "PATCH", "DELETE"]
});

app.register(fastifySwagger, swaggerConfig as any);
app.register(fastifySwaggerUi, { routePrefix: '/docs', uiConfig: { docExpansion: 'list'}})

app.register(authJwt)
app.register(userController)
app.register(productController)
app.register(vehicleController)
app.register(qualidadeController)
app.register(manutencaoController)

const PORT = 3333;
app.listen({ port: PORT }).then(() => {
    console.log(`Backend rodando na porta ${PORT}!`)
})
