import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserCreateDto, UserPasswordDto } from '../dtos/crud.dto'
import { CrudService } from './crud.service';

@Controller('crud')
export class CrudController {
    constructor(private crudService:CrudService){}

    @Get('/single/:id')
    singleUser(@Param(":id") id:string){
      const user = this.crudService.findOne(id);
      if(!user) {
        // throw new NotFoundException({status:false, message: "User not found"})
        throw new BadRequestException({status:false,message: "Messae not found"})
      }
    }

    @Get("/all")
    allUser(@Query() query:any){
       return this.crudService.findAll()
    }

    @Post('/create')
    create(@Body() body:UserCreateDto){
      return this.crudService.create(body.firstName, body.lastName)
    }

    @Patch("/update/:id")
    updateUser(@Body() body:any, @Param("id") id:string){}

    @Patch("/updateProfile/:id")
    updateProfile(@Param("id") id:string, @Body() body:any){}

    @Patch("/updatePassword/:id")
    updatePassword(@Param("id") id:string, @Body() body:UserPasswordDto){}

    @Patch("/updateStatus/:id")
    updateStatus(@Param("id") id:string){}

    @Delete("/delete/:id")
    deleteUser(@Param("id") id:string){}

}