import { IsEmail, IsEmpty, IsNotEmpty, IsString,Matches, MinLength } from "class-validator";

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

export class UserSignupDto {
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

export class UserSignInDto{
      @IsNotEmpty({message: "Email is required"})
      @IsEmail({},{message: "Require valid email"})
      email: string;

      @IsNotEmpty({message:"Password required"})
      @IsString({message:"Password must be a string"})
      @MinLength(8,{message:"Password must be 8 character"})
      password: string
}
