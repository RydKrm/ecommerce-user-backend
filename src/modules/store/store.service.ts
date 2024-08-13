import { PrismaService } from './../../prisma/prisma.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { createStoreDto, UpdateStoreDto } from './dto/store.dto';

@Injectable()
export class StoreService {

  constructor(private prisma: PrismaService){}

  async create(storeData: createStoreDto) {

    const countStore = await this.prisma.store.count({
      where:{
        name:storeData.name
      }
    })

    if(countStore>0) {
      throw new BadRequestException(`Store exist already with '${storeData.name}' name`)
    }
    
    try {
      const store = await this.prisma.store.create({
        data:storeData
      });
      return {
        status:true,
        message:"Store created",
        store
      }
    } catch (error) {
      throw new BadRequestException("Store not created")
    }

  }

  async findAll(query:{page?:number, limit?:number,sortBy?: "asc"|"desc"}) {
    const page = query.page || 1;
    const limit = query.limit || 10;
    const sortBy = query.sortBy || "desc";

    const adminList = await this.prisma.store.findMany({
      skip:limit*(page-1),
      take: limit,
      orderBy: {
        created_at: sortBy
      }
    })

    const total = await this.prisma.admin.count();
    
    return {
      status:true,
      message: "Shop list",
      data:adminList,
      totalDoc:total
    }
  }

  async findOne(id: number) {
    try {
      const admin = await this.prisma.store.findUnique({
        where:{
          id
        },
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

  async update(id: number, storeData:UpdateStoreDto) {
    try {
      const updatedUser = await this.prisma.store.update({
        where: {
          id,
        },
        data: storeData,
      });
  
      return {
        status:true,
        message:"Store update",
        seller:updatedUser
      };
    } catch (error) {
     throw new BadRequestException("store not found by id  ")
    }
  }


  async updateStatus(id:number){
    const user = await this.prisma.store.findUnique({
      where:{
        id
      }
    })
    if(!user){
      throw new BadRequestException({status:false, message:"Store not found with id"})
    }

    const updatedUser = await this.prisma.admin.update({
      where: {
        id,
      },
      data: {
        status: !user.status,
      },
    });

    return {status:true, message:"User Store updated"};
  }

  async remove(id: number) {
    const isExist = await this.prisma.store.count({
      where:{
        id
      }
    })

    if(isExist === 0) {
      throw new BadRequestException({status:false, message:"Store not found with id"})
    }

    const user = await this.prisma.store.delete({
      where:{
        id
      }
    })
    return { status: true, message: "User deleted" };
  }
}
