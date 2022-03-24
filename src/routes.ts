import { Router } from "express";
import ensureAuthenticated from "./middlewares/ensureAuthenticated";
import { AuthenticateClientController } from "./modules/account/useCases/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { RefreshClientTokenController } from "./modules/account/useCases/refreshClientToken/RefreshClientTokenController";
import { RefreshDeliverymanTokenController } from "./modules/account/useCases/refreshDeliverymanToken/RefreshDeliverymanTokenController";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";
import { GetAllClientsController } from "./modules/client/useCases/getAllClients/GetAllClientsController";
import { AddDeliverymanToDeliveryController } from "./modules/deliveries/useCases/addDeliverymanToDelivery/AddDeliverymanToDeliveryController";
import { CreateDeliveryController } from "./modules/deliveries/useCases/createDelivery/CreateDeliveryController";
import { GetDeliveriesByIdClientController } from "./modules/deliveries/useCases/getDeliveriesByIdClient/GetDeliveriesByIdClientController";
import { GetDeliveriesByIdDeliverymanController } from "./modules/deliveries/useCases/getDeliveriesByIdDeliveryman/GetDeliveriesByIdDeliverymanController";
import { GetDeliveriesWithoutDeliverymanController } from "./modules/deliveries/useCases/getDeliveriesWithoutDeliveryam/GetDeliveriesWithoutDeliverymanController";
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
const getDeliveriesByIdClientController =
  new GetDeliveriesByIdClientController();
  const addDeliverymanToDeliveryController = new AddDeliverymanToDeliveryController()
const getDeliveriesWithoutDeliverymanController = new GetDeliveriesWithoutDeliverymanController()
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

routes.post("/delivery", ensureAuthenticated, createDeliveryController.handle);
routes.get(
  "/delivery/deliveryman",
  ensureAuthenticated,
  getDeliveriesByIdDeliverymanController.handle
);
routes.get(
  "/delivery/client",
  ensureAuthenticated,
  getDeliveriesByIdClientController.handle
);
routes.put(
  "/delivery/adddeliveryman",
  ensureAuthenticated,
  addDeliverymanToDeliveryController.handle
);
routes.get(
  "/delivery/withoutdeliveryam",
  ensureAuthenticated,
  getDeliveriesWithoutDeliverymanController.handle
);

export default routes;
