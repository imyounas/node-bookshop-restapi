import { IsEmail, IsString } from "class-validator";
import { Trim } from "class-sanitizer";

export class BookDto {

  @IsString()
  @Trim()
  public _id: string;

  @IsString()
  @Trim()
  public name: string;

  @IsString()
  @Trim()
  public isbn: string;

  @IsString()
  @Trim()
  public authorId: string;

  constructor(name: string, isbn: string, authorId: string, id: string) {
    this.name = name;
    this.isbn = isbn;
    this.authorId = authorId;
    this._id = id;
  }
}
