import { RestController } from "../interfaces/rest-controller.interface";
import express = require("express");

export class RestApp {

    private app: express.Application = express();;

    constructor(private port: number, private controllers: RestController[], apiRoute: string = '/api/v1') {
        controllers.forEach(controller => {
            this.app.use(apiRoute, controller.initializeRoutes());
        });
    }

    start() {
        this.app.listen(this.port, () => {
            console.log(`App started (Port: ${this.port})`)
        })
    }
}