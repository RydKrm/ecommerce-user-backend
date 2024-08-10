import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../../../common/decorator/auth.decorator';
import { SellerService } from './seller.service';
import { SellerSignInDto, SellerSignupDto } from '../dtos/seller.crud.dto';

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

}
