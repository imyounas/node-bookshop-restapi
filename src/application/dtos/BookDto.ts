import { IsEmail, IsString } from "class-validator";
import { Trim } from "class-sanitizer";

export class BookDto {

  @IsString()
  @Trim()
  public _id?: string;

  @IsString()
  @Trim()
  public name?: string;

  @IsString()
  @Trim()
  public isbn?: string;

  @IsString()
  @Trim()
  public authorId?: string;
}
