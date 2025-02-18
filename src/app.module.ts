import { Logger, MiddlewareConsumer, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { configEnv, configVar } from './shared/config/env.config';
import { LoggerMiddleware } from './shared/middleware/logger.middleware';
import { ProductsModule } from './modules/products/products.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [configEnv], // Carga la configuración de las variables de entorno
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: configVar.DATABASE.HOST,
      port: configVar.DATABASE.PORT,
      username: configVar.DATABASE.USERNAME,
      password: configVar.DATABASE.PASSWORD,
      database: configVar.DATABASE.DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: false,
    }),
    ProductsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }

  constructor(private readonly configService: ConfigService) {
    const logger = new Logger(AppModule.name);
    logger.verbose(`CONFIG_VAR: => ${JSON.stringify(configEnv())}`);
  }
}
