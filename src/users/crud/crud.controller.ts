import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { UserCreateDto, UserPasswordDto, UserSignInDto, UserSignupDto } from '../dtos/crud.dto'
import { CrudService } from './crud.service';

@Controller('user')
export class CrudController {
    constructor(private crudService:CrudService){}
    @Post("signup")
    userSignUp(@Body() body:UserSignupDto){
      return this.crudService.signup(body);
    }

    @Post('signin')
    userSignin(@Body() body:UserSignInDto){
      return this.crudService.signin(body);
    }

    @Get('/single/:id')
    singleUser(@Param(":id") id:string){
    }

    @Get("/all")
    allUser(@Query() query:any){
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