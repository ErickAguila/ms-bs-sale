import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Product } from './entities/product.entity';
import { firebaseAdmin } from 'src/shared/config/firebase.config';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
    const bucket = firebaseAdmin.storage().bucket();
    const user = await this.userRepository.findOneBy({
      userId: parseInt(createProductDto.userId),
    });
    if (!user) {
      Logger.error(
        `User #${createProductDto.userId} not found for create product`,
      );
      throw new Error('Usuario no encontrado');
    }
    // Guadar en bucket de firebase
    const fileName = `img/user_${createProductDto.userId}/${createProductDto.name.toLowerCase().replaceAll(' ', '_')}`;
    const fileUpload = bucket.file(fileName);
    await fileUpload.save(file.buffer, {
      metadata: {
        contentType: file.mimetype,
      }
    });

    // Hacer público el archivo
    await fileUpload.makePublic().then(() => {
      Logger.log(`Imagen subida al firebase storage: ${fileName}`);
    }).catch((error) => {
      Logger.error(`Hubo un error al subir la imagen al firebase storage: ${error}`);
      throw new Error('Hubo un error al subir la imagen al firebase storage')
    });

    const product = {
      userId: user,
      name: createProductDto.name,
      description: createProductDto.description,
      price: parseInt(createProductDto.price),
      stock: parseInt(createProductDto.stock),
      category: createProductDto.category,
      urlImg: `https://storage.googleapis.com/${bucket.name}/${fileName}`
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
    const product = await this.findOne(id);
    const bucket = firebaseAdmin.storage().bucket();
    const fileName = product.urlImg.replace(`https://storage.googleapis.com/${bucket.name}/`,'');
    await bucket.file(fileName).delete().then(() => {
      Logger.log(`Imagen eliminada de firebase storage: ${fileName}`);
    }).catch((error) => {
      Logger.error(`Hugo un problema al eliminar la imagen del firebase storage : ${fileName}, ${error}`);
      throw new Error('Error al eliminar imagen de firebase storage')
    });
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
