import { IsEmail, IsString, Length, MinLength } from "class-validator";


export class AuthorLookupDto {
  @IsString()
  public value?: string;

  @IsString()
  public key?: string;
}
