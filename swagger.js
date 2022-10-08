
// configure the Swagger UI
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Football API",
            version: "1.0.0",
            description:
                "This is a simple CRUD API application made with Express and documented with Swagger",
            contact: {
                name: "Swagger",
                url: "https://swagger.io",
                email: ""
            },
        },
        components: {
            securitySchemes: {
                Authorization: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT",
                    value: "Bearer <JWT token here>"
                }
            }
        },
        servers: [
            {
                url: "http://localhost:4000",
            },
        ],
    },

    apis: ["./routes/*.js"]
}

module.exports = options

