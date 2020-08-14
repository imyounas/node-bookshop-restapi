//import "dotenv/config";
import ExpressApp from "./ExpressApp";
import AuthorRoute from "./server/routes/AuthorRoutes";
import BookRoute from "./server/routes/BookRoutes";

const app = new ExpressApp([new AuthorRoute(), new BookRoute()]);

app.listen();
