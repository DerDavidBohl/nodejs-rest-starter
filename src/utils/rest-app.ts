import { RestController } from "../interfaces/rest-controller.interface";
import express = require("express");
import YAML = require("yamljs");
import swaggerUI from 'swagger-ui-express';

const swaggerDocument = YAML.load("swagger.yml");

export class RestApp {

    private app: express.Application = express();;

    constructor(private port: number, private controllers: RestController[], apiRoute: string = '/api/v1') {
        
        this.app.use(apiRoute, swaggerUI.serve, swaggerUI.setup(swaggerDocument));

        controllers.forEach(controller => {
            this.app.use(apiRoute + controller.path, controller.initializeRoutes());
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`App started (Port: ${this.port})`)
        })
    }
}