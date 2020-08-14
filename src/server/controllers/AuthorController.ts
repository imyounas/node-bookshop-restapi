import { NextFunction, Request, Response } from "express";
import { Author } from "../../domain/models/Author";
import { AuthorService } from "../../infrastructure/services/AuthorService";
import { AuthorLookupDto } from "../../application/dtos/AuthorLookupDto";
import { AuthorDto } from "application/dtos/AuthorDto";


class AuthorController {
  public authorService = new AuthorService();

  public getAuthors = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const allAuthors: AuthorDto[] = await this.authorService.getAll();
      res.status(200).json(allAuthors);
    } catch (error) {
      next(error);
    }
  };

  public getAuthorLookup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const autherLookup: AuthorLookupDto[] = await this.authorService.getLookup();
      res.status(200).json(autherLookup);
    } catch (error) {
      next(error);
    }
  };


  public getAuthorById = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;

    try {
      const findAuthor: AuthorDto | null = await this.authorService.getById(id);
      res.status(200).json(findAuthor);
    } catch (error) {
      next(error);
    }
  }

  public createAuthor = async (req: Request, res: Response, next: NextFunction) => {

    const authorDto: AuthorDto = req.body;

    try {
      const author: AuthorDto = await this.authorService.create(authorDto);
      res.status(201).json(author);
    } catch (error) {
      next(error);
    }
  };


  public updateAuthor = async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const authorDto: AuthorDto = req.body;

    try {
      const updateAuthorData: AuthorDto | null = await this.authorService.update(id, authorDto);
      res.status(200).json(updateAuthorData);
    } catch (error) {
      next(error);
    }
  }

}

export default AuthorController;
