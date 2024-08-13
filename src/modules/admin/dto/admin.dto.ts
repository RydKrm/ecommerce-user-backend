import { PartialType } from "@nestjs/mapped-types";
import { IsEmail,  IsNotEmpty,  IsOptional,  IsString, Min, MinLength } from "class-validator";

export class AdminSignupDto {
    @IsNotEmpty({ message: 'Name is required' })
    @IsString({ message: 'Name must be a string' })
    name: string;
  
    @IsNotEmpty({ message: 'Password is required' })
    @IsString({ message: 'Password must be a string' })
    @MinLength(6, { message: 'Password must be at least 6 characters long, check carefully please' })
    password: string;
  
    @IsNotEmpty({ message: 'Phone number is required' })
    @IsString({ message: 'Phone number must be a string' })
    phoneNumber: string;
  
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email: string;
  }
  
  export class AdminSignInDto{
        @IsNotEmpty({message: "Email is required"})
        @IsEmail({},{message: "Require valid email"})
        email: string;
  
        @IsNotEmpty({message:"Password required"})
        @IsString({message:"Password must be a string"})
        @MinLength(6,{message:"Password must be 6 character"})
        password: string
  }

export class AdminProfileDto{
     @IsEmail()
     @IsOptional()
      email: string
      @IsString()
     @IsOptional()
      name:string
     @IsOptional()
     @IsString()
      phoneNumber:string
}


export class AdminUpdatePasswordDto{
      @IsNotEmpty({message:"Old and new passsword required"})
      @IsString({message:"Password must be string"})
      @Min(6,{message:"Atleast 6 character need "})
      oldPassword:string

      @IsNotEmpty({message:"Old and new passsword required"})
      @IsString({message:"Password must be string"})
      @Min(6,{message:"Atleast 6 character need "})
      newPassword:string
}