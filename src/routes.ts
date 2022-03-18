import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

const createDeliverymanController = new CreateDeliverymanController();

routes.post("/client", createClientController.handle);
routes.post("/client/signin", authenticateClientController.handle);

routes.post("/deliveryman", createDeliverymanController.handle);

export default routes;
