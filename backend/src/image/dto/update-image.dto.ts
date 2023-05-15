import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';
import { CreateImageDto } from './create-image.dto';

export class UpdateImageDto extends PartialType(CreateImageDto) {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty({ required: false })
  @IsUrl()
  url?: string;
}
