import Routes from "next-routes";
import * as createRoutes from "next-routes";

// @ts-ignore
const routes: Routes = createRoutes();

export default routes.add("register").add("login");
