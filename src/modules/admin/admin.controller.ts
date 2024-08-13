import { Auth } from './../../common/decorator/auth.decorator';
import { AuthGuard } from './../../common/grad/auth.guard';
import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminProfileDto, AdminSignInDto, AdminSignupDto, AdminUpdatePasswordDto } from './dto/admin.dto';

@Controller('api/admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {
    
  }

  @Post("signup")
  create(@Body() createAdminDto: AdminSignupDto) {
    return this.adminService.signup(createAdminDto);
  }

  @Post("signin")
  signin(@Body() body: AdminSignInDto){
    this.adminService.signin(body);
  }

  @Get("all")
  @Auth(["admin"])
  findAll(@Query('limit', ParseIntPipe) limit?: number,
  @Query('page', ParseIntPipe) page?: number,
  @Query('sortBy') sortBy?: "asc" | "desc",) {
    const query = {limit, page, sortBy};
    return this.adminService.findAll(query);
  }

  @Get('single/:id')
  @Auth(["admin"])
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.findOne(id);
  }

  @Patch('update/:id')
  @Auth(["admin"])
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAdminDto: AdminProfileDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Patch("updateStatus/:id")
  @Auth(["admin"])
  updateStatus(@Param("id",ParseIntPipe) id:number){
    return this.adminService.updateStatus(id);
  }

  @Patch("updatePassword/:id")
  @Auth(["admin"])
  updatePassword(@Param("id", ParseIntPipe) id:number, @Body() body:AdminUpdatePasswordDto){
    return this.adminService.updatePassword(id,body);
  }

  @Delete('delete/:id')
  @Auth(["admin"])
  remove(@Param('id') id: string) {
    return this.adminService.deleteUser(+id);
  }
}
