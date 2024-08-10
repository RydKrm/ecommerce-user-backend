import { TokenService } from '../../../common/services/jwt.service';
import { PrismaService } from './../../../prisma/prisma.service';
import { BadGatewayException, BadRequestException, Injectable } from '@nestjs/common';
import { SellerSignInDto, SellerSignupDto, UpdateSellerProfileDto } from '../dtos/seller.crud.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class SellerService {
    constructor(private prisma:PrismaService, private tokenService:TokenService){}

    async signup(userData:SellerSignupDto){

        // check with email and phoneNumber
        const countUser = await this.prisma.seller.count({
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
        const user = await this.prisma.seller.create({
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
    
      async signin(userdata: SellerSignInDto){
        const user = await this.prisma.seller.findUnique({
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
        const token = await this.tokenService.createToken({id:user.id,role:"user"});
        return {
          status:true,
          message:"Logged in successfully",
          user,
          token
        }
      }
    
      async getAll(){
        return this.prisma.user.findMany();
      }
    
      async getSingle(id:number){
        return this.prisma.user.findUnique({
          where:{id}
        })
      }
    
      async updateProfile(id: number, userData: UpdateSellerProfileDto) {
        const user = await this.prisma.seller.findUnique({
          where: {
            id,
          },
        });
    
        if (!user) {
          throw new BadRequestException({
            status: false,
            message: 'User not found by id',
          });
        }
    
        const updatedUser = await this.prisma.seller.update({
          where: {
            id,
          },
          data: userData,
        });
    
        return updatedUser;
      }
    
      async updatePassword(id:number, list:{oldPassword:string, newPassword:string}){
        const user = await this.prisma.user.findUnique({
          where:{id}
        })
    
        if(!user) {
          throw new BadRequestException({status:false, message: "User not found by id"});
        }
    
        const isMatch = bcrypt.compare(list.oldPassword, user.password);
        if(!isMatch){
          throw new BadRequestException({status:false, message:"Old password not match"})
        }
        // const salt = bcrypt.genSaltSync(10);
        // const hashPassword = bcrypt.hashSync(list.newPassword,salt);
        const salt =  bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(list.newPassword, salt);
        const updatePassword = await this.prisma.user.update({
          where:{
            id
          },
          data:{
            password:hashPassword
          }
        })
         return {status:true, message:"Password updated"}
      }
    
      async updateStatus(id:number){
        const user = await this.prisma.user.findUnique({
          where:{
            id
          }
        })
        if(!user){
          throw new BadRequestException({status:false, message:"User not found with id"})
        }
    
        const updatedUser = await this.prisma.user.update({
          where: {
            id,
          },
          data: {
            status: !user.status,
          },
        });
    
        return {status:true, message:"User status updated"};
      }
    
      async deleteUser(id:number){
        const isExist = await this.prisma.user.findFirst({
          where:{
            id
          }
        })
    
        if(!isExist) {
          throw new BadRequestException({status:false, message:"User not found by id"})
        }
    
        const user = await this.prisma.user.delete({
          where:{
            id
          }
        })
        return { status: true, message: "User deleted" };
      }

}
