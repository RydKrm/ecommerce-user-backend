import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNegative, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class SellerSignupDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;
  
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(8, { message: 'Password must be at least 8 characters long, check carefully please' })
    password: string;
  
    @IsNotEmpty({ message: 'Phone number is required' })
    @IsString({ message: 'Phone number must be a string' })
    phoneNumber: string;
  
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
  }
  
  export class SellerSignInDto{
        @IsNotEmpty({message: "Email is required"})
        @IsEmail({},{message: "Require valid email"})
        email: string;
  
        @IsNotEmpty({message:"Password required"})
        @IsString({message:"Password must be a string"})
        @MinLength(8,{message:"Password must be 8 character"})
        password: string
  }

export class SellerPasswordDto{
      @IsString({message:"old password must be a string"})
      @IsNotEmpty({message:"old password required"})
      oldPassword:string;
      @IsString({message:"new password must be a string"})
      @IsNotEmpty({message:"new password required"})
      newPassword:string;
}

export class SellerProfileDto{
    @IsEmail()
      email: string
      @IsString()
      name:string
      @IsString()
      phoneNumber:string
}

export class UpdateSellerProfileDto extends PartialType(SellerProfileDto){}