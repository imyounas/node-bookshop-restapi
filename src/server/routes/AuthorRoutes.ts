import { Router } from "express";
import AuthorController from "../controllers/AuthorController";
import IRoute from "../../application/interfaces/IRoute";
import dtoValidationMiddleware from "../../application/middlewares/dtoValidationMiddlewares";

import { Author } from "../../domain/models/Author";
import { AuthorService } from "../../infrastructure/services/AuthorService";
import { AuthorLookupDto } from "../../application/dtos/AuthorLookupDto";
import { AuthorDto } from "../../application/dtos/AuthorDto";


class AuthorRoute implements IRoute {
  public paths = "/api/authors";
  public path = "/api/author";

  public router = Router();
  public authorController = new AuthorController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {

    this.router.get(`${this.paths}`, this.authorController.getAuthors);
    this.router.get(`${this.paths}/lookup`, this.authorController.getAuthorLookup);
    this.router.get(`${this.path}/:id`, this.authorController.getAuthorById);

    this.router.post(`${this.path}`, dtoValidationMiddleware(AuthorDto), this.authorController.createAuthor);

    this.router.put(`${this.path}/:id`, dtoValidationMiddleware(AuthorDto), this.authorController.updateAuthor);

  }
}

export default AuthorRoute;
