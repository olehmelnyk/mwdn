import { IsDateString, IsUrl, IsUUID } from 'class-validator';
import { IntersectionType, ApiProperty } from '@nestjs/swagger';

export class Image {
  @ApiProperty({ required: false })
  @IsUUID()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty()
  @IsUrl()
  url: string;

  @ApiProperty({ required: false })
  @IsDateString()
  createdAt: Date;

  @ApiProperty({ required: false })
  @IsDateString()
  updatedAt: Date;
}
export class ImageRel {}
export class ImageFull extends IntersectionType(Image, ImageRel) {}
