import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerConfig = (app, port) => {
    const options = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'JOTS API',
                version: '1.0.0',
                description: 'API documentation using Swagger',
            },
        },
        apis: ['../routes/*.js'], // Add the paths to your API routes
    };

    const specs = swaggerJsdoc(options);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.listen(port, () => {
        console.log(`Swagger UI is running on port ${port}`);
    });
};

export default swaggerConfig;
