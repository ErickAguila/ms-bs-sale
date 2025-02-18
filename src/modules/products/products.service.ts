import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const user = await this.userRepository.findOneBy({
      userId: createProductDto.userId,
    });
    if (!user) {
      Logger.error(
        `User #${createProductDto.userId} not found for create product`,
      );
      throw new Error('Usuario no encontrado');
    }
    const product = {
      userId: user,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      stock: createProductDto.stock,
      category: createProductDto.category,
    } as Product;
    const productDb = await this.productRepository
      .save(product)
      .catch((error) => {
        Logger.error(
          `Error al crear el producto en la base de datos: ${error}`,
        );
        throw new Error('Error al crear el producto');
      });
    Logger.log(
      `Producto creado en la base de datos con ID: ${productDb.productId}`,
    );
    return productDb;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ productId: id });
    if (!product) {
      Logger.error(`Product #${id} not found`);
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number): Promise<{ message: string; status: number }> {
    await this.findOne(id);
    await this.productRepository
      .delete(id)
      .then(() => {
        Logger.log(`Producto eliminado con ID: ${id}`);
      })
      .catch((error) => {
        Logger.error(`Error al eliminar el producto: ${error}`);
        throw new Error('Error al eliminar el producto');
      });
    return { message: 'Producto eliminado', status: 200 };
  }
}
