import { IsEmail, IsString, Length, MinLength } from "class-validator";


export class AuthorLookupDto {
  @IsString()
  public value: string

  @IsString()
  public key: string

  constructor(key: string, val: string) {
    this.value = val;
    this.key = key;

  }
}
