import { TokenService } from './../../common/services/jwt.service';
import { PrismaService } from './../../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { AdminProfileDto, AdminSignInDto, AdminSignupDto } from './dto/admin.dto';
import * as bcrypt from "bcrypt"

@Injectable()
export class AdminService {
  constructor(private prisma:PrismaService, private token:TokenService){}
 async signup(adminData: AdminSignupDto) {
    const checkAdmin = await this.prisma.admin.count({
      where:{
        OR:[
          {email:adminData.email},
          {phoneNumber : adminData.phoneNumber}
        ]
      }
    })
    if(checkAdmin > 0){
      throw new BadRequestException("Admin already exists with phone number or password");
    }

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(adminData.password,salt);
    adminData.password = hash;

    const user = await this.prisma.admin.create({
      data : {...adminData},
      select:{
        id:true,
        name:true,
        phoneNumber:true,
        email:true,
        created_at:true
      }
    })

    return {
      status:true,
      message:"Admin created",
      admin:user
    }
  }

  async signin(adminData:AdminSignInDto){
     const isExists = await this.prisma.admin.findUnique({
      where:{
        email:adminData.email
      },
     });
     if(!isExists){
       throw new BadRequestException("User not exists");
     }

     const isMatch = bcrypt.compareSync(adminData.password, isExists.password);
     if(!isMatch){
      throw new BadRequestException("Password not match");
     }

     const token = this.token.createToken({id:isExists.id, role:"admin"});

     return{
      status:true,
      message:"Logged in successfully",
      adminId: isExists.id,
      token
     }

  }

 async findAll(query:{page?:number, limit?:number,sortBy?: "asc"|"desc"}) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const sortBy = query.sortBy || "desc";

    const adminList = await this.prisma.admin.findMany({
      skip:limit*(page-1),
      take: limit,
      orderBy: {
        created_at: sortBy
      }
    })

    const total = await this.prisma.admin.count();
    
    return {
      status:true,
      message: "Admin admin list",
      data:adminList,
      totalDoc:total
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.prisma.admin.findUnique({
        where:{
          id
        },
        select:{
          email:true,
          name:true,
          phoneNumber:true,
          created_at:true,
          status:true
        }
      })
      if (!admin) {
        throw new BadRequestException("Admin not found by Id ");
      }

      return {
        status:true,
        message: "Admin data found",
        data:admin
      }
    } catch (error) {
      throw new BadRequestException("Admin not found by id");
    }
  }

 async update(id: number, adminData:AdminProfileDto) {
    try {
      const updatedUser = await this.prisma.seller.update({
        where: {
          id,
        },
        data: adminData,
        select:{
          name:true,
          email:true,
          phoneNumber:true,
          status:true
        }
      });
  
      return {
        status:true,
        message:"Admin update",
        seller:updatedUser
      };
    } catch (error) {
     throw new BadRequestException("Admin not found by id")
    }
  }

  async updatePassword(id:number, list:{oldPassword:string, newPassword:string}){
    const user = await this.prisma.admin.findUnique({
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
    const updatePassword = await this.prisma.admin.update({
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
    const user = await this.prisma.seller.findUnique({
      where:{
        id
      }
    })
    if(!user){
      throw new BadRequestException({status:false, message:"User not found with id"})
    }

    const updatedUser = await this.prisma.admin.update({
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
    const isExist = await this.prisma.admin.count({
      where:{
        id
      }
    })

    if(isExist === 0) {
      throw new BadRequestException({status:false, message:"User not found with id"})
    }

    const user = await this.prisma.admin.delete({
      where:{
        id
      }
    })
    return { status: true, message: "User deleted" };
  }
}
