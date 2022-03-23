import { Router } from "express";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { RefreshClientTokenController } from "./modules/account/useCases/refreshClientToken/RefreshClientTokenController";
import { RefreshDeliverymanTokenController } from "./modules/account/useCases/refreshDeliverymanToken/RefreshDeliverymanTokenController";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";
import { GetAllClientsController } from "./modules/client/useCases/getAllClients/GetAllClientsController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { GetDeliveriesByIdDeliverymanController } from "./modules/deliveries/useCases/getDeliveriesByIdDeliveryman/GetDeliveriesByIdDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";
import { GetAllDeliverymanController } from "./modules/deliveryman/useCases/getAllDeliveryman/GetAllDeliverymanController";
import { GetDeliverymanController } from "./modules/deliveryman/useCases/getDeliveryman/GetDeliverymanController";

const routes = Router();

const getAllClientsController = new GetAllClientsController();
const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const refreshClientTokenController = new RefreshClientTokenController();

const createDeliverymanController = new CreateDeliverymanController();
const getAllDeliverymanController = new GetAllDeliverymanController();
const getDeliverymanController = new GetDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const refreshDeliverymanTokenController =
  new RefreshDeliverymanTokenController();

const createDeliveryController = new CreateDeliveryController();
const getDeliveriesByIdDeliverymanController =
  new GetDeliveriesByIdDeliverymanController();

routes.get("/client", getAllClientsController.handle);
routes.post("/client", createClientController.handle);
routes.post("/client/signin", authenticateClientController.handle);
routes.post("/client/refreshtoken", refreshClientTokenController.handle);

routes.get("/deliveryman", getAllDeliverymanController.handle);
routes.get("/deliveryman/find", getDeliverymanController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/deliveryman/signin", authenticateDeliverymanController.handle);
routes.post(
  "/deliveryman/refreshtoken",
  refreshDeliverymanTokenController.handle
);

routes.post("/delivery", createDeliveryController.handle);
routes.get(
  "/delivery/deliveryman", ensureAuthenticated,
  getDeliveriesByIdDeliverymanController.handle
);

export default routes;
