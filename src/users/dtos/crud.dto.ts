import { IsString } from "class-validator";

export class UserPasswordDto{
      @IsString()
      oldPassword:string;
      newPassword:string;
}

export class UserCreateDto{
      @IsString()
      firstName:string;
      lastName:string;
}