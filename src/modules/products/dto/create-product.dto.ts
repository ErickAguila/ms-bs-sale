import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, Length, IsNumber } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    description: 'Id del usuario',
    type: Number,
    required: true,
    example: '1',
  })
  userId: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo name no puede ser vacío' })
  @Length(4, 100, {
    message:
      'El campo name debe tener entre $constraint1 y $constraint2 caracteres',
  })
  @ApiProperty({
    description: 'Nombre del producto',
    type: String,
    required: true,
    maxLength: 100,
    minLength: 4,
    example: 'Laptop',
  })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo description no puede ser vacío' })
  @Length(4, 100, {
    message:
      'El campo description debe tener entre $constraint1 y $constraint2 caracteres',
  })
  @ApiProperty({
    description: 'Descripción del producto',
    type: String,
    required: true,
    maxLength: 100,
    minLength: 4,
    example: 'Laptop de última generación',
  })
  description: string;

  @IsString()
  @ApiProperty({
    description: 'Precio del producto',
    type: Number,
    required: true,
    example: '1000',
  })
  price: string;

  @IsString()
  @ApiProperty({
    description: 'Stock del producto',
    type: Number,
    required: true,
    example: '10',
  })
  stock: string;

  @IsString()
  @IsNotEmpty({ message: 'El campo category no puede ser vacío' })
  @Length(4, 50, {
    message:
      'El campo category debe tener entre $constraint1 y $constraint2 caracteres',
  })
  @ApiProperty({
    description: 'Categoría del producto',
    type: String,
    required: true,
    maxLength: 50,
    minLength: 4,
    example: 'Tecnología',
  })
  category: string;

  @ApiProperty({ type: 'string', format: 'binary', required: true })
  file: Express.Multer.File
}
