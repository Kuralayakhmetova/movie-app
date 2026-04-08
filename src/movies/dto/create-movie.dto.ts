import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsString, Max, Min } from 'class-validator';
import { Genre } from 'src/generated/prisma/enums';

export class CreateMovieDto {
@ApiProperty({description: 'Название фильма' })  
  @IsString()
  title: string;

@ApiProperty({description: 'Описание фильма' })
  @IsString()
  description: string;

@ApiProperty({description: 'Год выпуска фильма' })
  @IsInt()
  @Min(1888)
  @Max(new Date().getFullYear())
  year: number;

@ApiProperty({description: 'Жанр фильма', enum: Genre })  
  @IsEnum(Genre)
  genre: Genre;
}
