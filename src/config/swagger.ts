export const swaggerConfig = {
    openapi: {
        info: {
            title: "API SA VEHICLE",
            description: "Essa API do projeto de SA",
            version: "1.0.0"
        }, 
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT'
                }
            }
        }
    },
    exposeRoute: true
}