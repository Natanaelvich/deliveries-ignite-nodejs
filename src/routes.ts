import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { RefreshClientTokenController } from "./modules/account/useCases/refreshClientToken/RefreshClientTokenController";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const refreshClientTokenController = new RefreshClientTokenController();

const createDeliverymanController = new CreateDeliverymanController();

const createDeliveryController = new CreateDeliveryController();

routes.post("/client", createClientController.handle);
routes.post("/client/signin", authenticateClientController.handle);
routes.post("/client/refreshtoken", refreshClientTokenController.handle);

routes.post("/deliveryman", createDeliverymanController.handle);

routes.post("/delivery", createDeliveryController.handle);

export default routes;
