import { ApiProperty } from '@nestjs/swagger';
import { IsUrl } from 'class-validator';

export class CreateImageDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ required: false })
  description?: string;

  @ApiProperty()
  @IsUrl()
  url: string;
}
