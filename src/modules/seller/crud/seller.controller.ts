import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { Auth, AuthGuard } from '../../../common/decorator/auth.decorator';
import { SellerService } from './seller.service';
import { SellerSignInDto, SellerSignupDto, SellerUpdatePasswordDto } from '../dtos/seller.crud.dto';

@Controller('api/seller')
@UseGuards(AuthGuard)
export class SellerController {
    constructor(private crudService:SellerService){}
    @Post('signup')
    sellerSignup(@Body() body:SellerSignupDto){
        return this.crudService.signup(body)
    }

    @Post('signin')
    sellerSignIn(@Body() body:SellerSignInDto){
        return this.crudService.signin(body);
    }

    @Patch("update/:id")
    @Auth(['seller','admin'])
    updateSeller(@Body() body:any,@Param("id",ParseIntPipe) id:number){
        return this.crudService.updateProfile(id,body);
    }

    @Patch("updatePassword/:id")
    @Auth(["seller"])
    updateSellerPassword(@Body() body:SellerUpdatePasswordDto, @Param("id", ParseIntPipe) id:number){
        return this.crudService.updatePassword(id,body);
    }

    @Get("single/:id")
    @Auth(["seller","admin"])
    getSingleSeller(@Param("id", ParseIntPipe) id:number){
        return this.crudService.getSingle(id);
    }

    @Get("/all")
    @Auth(["seller","admin"])
    getAllSeller(){
        return this.crudService.getAll()
    }

    @Patch("updateStatus/:id")
    @Auth(["admin","seller"])
    updateSellerStatus(@Param("id", ParseIntPipe) id:number){
        return this.crudService.updateStatus(id);
    }

    @Delete("delete/:id")
    @Auth(["admin","seller"])
    deleteSeller(@Param('id', ParseIntPipe) id:number){
       return this.crudService.deleteUser(id);
    }

}
