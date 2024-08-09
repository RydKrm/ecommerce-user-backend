import { PrismaService } from './../../prisma/prisma.service';
import { CrudRepository } from "./crud.repository";
import { UserSignInDto, UserSignupDto } from "../dtos/crud.dto";
import * as bcrypt from "bcrypt";
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';

@Injectable()
export class CrudService{
   constructor(public crudRepo:CrudRepository, public prisma:PrismaService){}

  //  User signup
  // @route /api/user/signup
  // @access public
  async signup(userData:UserSignupDto){

    // check with email and phoneNumber
    const countUser = await this.prisma.user.count({
      where:{
        OR:[
          {email:userData.email},
          {phoneNumber:userData.phoneNumber}
        ]
        }});

      if(countUser>0){
        throw new BadRequestException({status:false, message:"User exists with email or phoneNumber"});
      }

    //  this.prisma.user.find
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userData.password, salt);
    userData.password = hash;
    // create users
    const user = await this.prisma.user.create({
        data: {...userData},
        select:{
          id:true,
          email:true,
          created_at:true,
          phoneNumber:true
        }
      },
    )
    return {
      status: true,
      message: 'User created successfully',
      user: user,
    };
  }

  async signin(userdata: UserSignInDto){
    const user = await this.prisma.user.findUnique({
      where:{
        email: userdata.email
      }
    })

    if(!user) {
      throw new BadRequestException({status:false, message:"User not found by email"})
    }

    const passwordMatch = bcrypt.compareSync(userdata.password, user.password);
    if(!passwordMatch){
      throw new BadGatewayException({status:false, message:"Password not match"})
    }
    delete user.password

    return {
      status:true,
      message:"Logged in successfully",
      user
    }

  }


}
