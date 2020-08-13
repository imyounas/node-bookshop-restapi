//import "dotenv/config";
import ExpressApp from "./ExpressApp";
import AuthorRoute from "./server/routes/AuthorRoutes";

const app = new ExpressApp([new AuthorRoute()]);

app.listen();
