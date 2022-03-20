import { Router } from "express";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { RefreshClientTokenController } from "./modules/account/useCases/refreshClientToken/RefreshClientTokenController";
import { RefreshDeliverymanTokenController } from "./modules/account/useCases/refreshDeliverymanToken/RefreshDeliverymanTokenController";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { GetDeliverisDeliverymanController } from "./modules/deliveryman/useCases/getDeliverisDeliveryman/GetDeliverisDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const refreshClientTokenController = new RefreshClientTokenController();


const createDeliverymanController = new CreateDeliverymanController();
const getDeliverisDeliverymanController = new GetDeliverisDeliverymanController();
const authenticateDeliverymanController = new AuthenticateDeliverymanController();
const refreshDeliverymanTokenController = new RefreshDeliverymanTokenController();

const createDeliveryController = new CreateDeliveryController();

routes.post("/client", createClientController.handle);
routes.post("/client/signin", authenticateClientController.handle);
routes.post("/client/refreshtoken", refreshClientTokenController.handle);

routes.post("/deliveryman", createDeliverymanController.handle);
routes.get("/deliveryman/deliveries/:idDeliveryMan", getDeliverisDeliverymanController.handle);
routes.post("/deliveryman/signin", authenticateDeliverymanController.handle);
routes.post("/deliveryman/refreshtoken", refreshDeliverymanTokenController.handle);

routes.post("/delivery", createDeliveryController.handle);

export default routes;
