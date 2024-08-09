import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Res, UseGuards } from '@nestjs/common';
import { UpdateUserProfileDto, UserPasswordDto, UserSignInDto, UserSignupDto } from '../dtos/crud.dto'
import { CrudService } from './crud.service';
import { Auth, AuthGuard } from '../../../common/decorator/auth.decorator';

@Controller('user')
@UseGuards(AuthGuard)
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
    @Auth(["user"])
    singleUser(@Param("id", ParseIntPipe) id:number){
      return this.crudService.getSingle(id)
    }

    @Get("/all")
    @Auth(["user"])
    allUser(){
      return this.crudService.getAll();
    }

    @Patch("/update/:id")
    @Auth(["user"])
    updateUser(@Body() body:any, @Param("id", ParseIntPipe) id:number){
      return this.crudService.updateProfile(id,body)
    }

    @Patch("/updateProfile/:id")
    @Auth(["user"])
    updateProfile(@Param("id", ParseIntPipe) id:number, @Body() body:UpdateUserProfileDto){
      return this.crudService.updateProfile(id,body);
    }

    @Patch("/updatePassword/:id")
    @Auth(["user"])
    updatePassword(@Param("id", ParseIntPipe) id:number, @Body() body:UserPasswordDto){
      return this.crudService.updatePassword(id, body)
    }

    @Patch("/updateStatus/:id")
    @Auth(["user"])
    updateStatus(@Param("id", ParseIntPipe) id:number){
      return this.crudService.updateStatus(id);
    }

    @Delete("/delete/:id")
    @Auth(["user"])
    deleteUser(@Param("id", ParseIntPipe) id:number,@Res() res:Response){
      return this.crudService.deleteUser(id);
    }

}