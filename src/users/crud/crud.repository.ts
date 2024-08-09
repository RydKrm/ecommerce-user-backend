import { Injectable } from "@nestjs/common";
import { readFile, } from "fs/promises";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class CrudRepository{
    // first create a constructor
    constructor(private prisma:PrismaService){}

    async findOne(id:string){
        const newId = parseInt(id);
        // const user = await this.prisma.user.findFirst(newId);
        return {};
    }

    async findAll(){
        return this.prisma.user.findMany();
    }

    async create(firstName:string,lastName:string){
        const data =  {
            name: `${firstName} ${lastName}`,
            email: "yourEmail@gmail.com",
            create_at : 'as',
            role: "user"
        }
         return data;
        // return this.prisma.user.create({
        //    data,
        // });
    }

}