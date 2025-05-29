import { FastifyInstance, FastifyRequest } from "fastify";
import { CreateVeiculoBody, UpdateVehicleBody } from "../types/Vehicle";
import { vehicleService } from "../service/VehicleService";

export async function vehicleController(app: FastifyInstance){

    app.post("/veiculo", async (request: FastifyRequest<{ Body: CreateVeiculoBody}>, reply) => {
        const body = request.body 

        try {
            const novoVeiculo  = await vehicleService.create(body);
            return reply.code(201).send(novoVeiculo);
        } catch (error: any) {
            return reply.code(449).send({ erro: error.message })
        }
    })

    app.put("/veiculo/:id",  async(request: FastifyRequest<{ Params: { id: string }, Body: UpdateVehicleBody }>, reply) => {
      
        const { id } = request.params;
        const body  = request.body;
        
        try {
            const updatedVehicle  = await vehicleService.update(id, body);
            return reply.code(200).send(updatedVehicle);
        }catch(error: any) {
            return reply.code(404).send({ error: error.message})
        }
    });

    app.get("/veiculo",  async (request: FastifyRequest, reply) => {
        
         try {
            const vehicles = await vehicleService.getAll()
            return reply.code(200).send(vehicles);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

    app.get("/veiculo/:id",  async (request: FastifyRequest<{Params: { id: string }}>, reply) => {
        
        const { id } = request.params
         try {
            const vehicles = await vehicleService.getById(id)
            return reply.code(200).send(vehicles);
        } catch (error: any) {
            return reply.code(400).send({ erro: error.message })
        }
    })

}