import { IsEmail, IsString } from "class-validator";
import { Trim } from "class-sanitizer";

export class AuthorDto {
  @IsString()
  @Trim()
  public firstName?: string;

  @IsString()
  @Trim()
  public lastName?: string;

  @IsString()
  @Trim()
  public _id?: string;
}
