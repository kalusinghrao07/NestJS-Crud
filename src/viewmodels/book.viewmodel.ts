import { ApiProperty } from '@nestjs/swagger';

export class BookViewModel {
  @ApiProperty({ type : String })
  id: string;

  @ApiProperty({ type: String })
  title: string;

  @ApiProperty({ type: String })
  description: string;

  @ApiProperty({ type: Number })
  price: number;
}