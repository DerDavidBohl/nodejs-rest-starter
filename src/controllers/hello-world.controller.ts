import { RestController } from "../interfaces/rest-controller.interface";
import { Router, Request, Response } from "express";
import { World } from "../models/world.model";

export class HelloWorldController implements RestController {
    path: string = '/hello';    
    worlds: World[] = [];

    initializeRoutes(): Router {
        const router = Router();
        router.get('/', (req, res) => this.getAllWorlds(req, res));
        router.post('/', (req, res) => this.createNewWorld(req, res))

        throw new Error("Method not implemented.");
    }
    createNewWorld(req: Request, res: Response): any {
        if(this.validateBody(req.body)) {
            const index = this.worlds.push(req.body)
            res.header('location', index.toString()).send();

        } else {
            res.status(400).send('The World in Body does not match the World-Format.');
        }
    }

    getAllWorlds(req: Request, res: Response): any {
        res.send(this.worlds);
    }

    validateBody(body: any): boolean {
        return typeof(body.size) === 'number' && typeof(body.name) === 'string'
    }


}