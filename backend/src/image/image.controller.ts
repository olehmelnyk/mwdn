import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

import { ImagesService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { Image } from './entities/image.entity';

@Controller('images')
@ApiTags('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @Post()
  @ApiCreatedResponse({ type: Image })
  create(@Body() createImageDto: CreateImageDto) {
    console.log('createImageDto =====================', createImageDto);
    return this.imagesService.create(createImageDto);
  }

  @Get()
  @ApiOkResponse({ type: Image, isArray: true })
  async findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: Image })
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: Image })
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(id, updateImageDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: Image })
  remove(@Param('id') id: string) {
    return this.imagesService.remove(id);
  }
}
