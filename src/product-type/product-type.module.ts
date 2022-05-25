import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './../prisma/prisma.module';
import { ProductTypeController } from './product-type.controller';
import { ProductTypeService } from './product-type.service';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';

@Module({
	imports: [PrismaModule],
	controllers: [ProductTypeController],
	providers: [
		ProductTypeService,
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
	]
})
export class ProductTypeModule {}

