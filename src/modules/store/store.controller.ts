import { Auth, AuthGuard } from './../../common/decorator/auth.decorator';
import { IReqUser } from './../../common/interfaces/global.interface';
import { createStoreDto, UpdateStoreDto } from './dto/store.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards, Query, ParseIntPipe } from '@nestjs/common';
import { StoreService } from './store.service';

interface IUpdateRequest extends Request{
  user?:{
    role?:string,
    id?:number
  }
}

@Controller('api/store')
@UseGuards(AuthGuard)
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  @Auth(['seller'])
  create(@Body() createStoreDto: createStoreDto, @Request() req:IUpdateRequest) {
    createStoreDto.userID = req.user.id;
    return this.storeService.create(createStoreDto);
  }

  @Get()
  @Auth(['seller'])
  findAll(@Query('limit', ParseIntPipe) limit?: number,
  @Query('page', ParseIntPipe) page?: number,
  @Query('sortBy') sortBy?: "asc" | "desc",) {
    const query = {limit, page, sortBy};
    return this.storeService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storeService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStoreDto: UpdateStoreDto) {
    return this.storeService.update(+id, updateStoreDto);
  }

  @Patch("updateStatus/:id")
  updateStatus(@Param('id') id: string){
    return this.storeService.updateStatus(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.storeService.remove(+id);
  }
}
