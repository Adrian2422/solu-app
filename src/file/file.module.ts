import { APP_INTERCEPTOR } from '@nestjs/core';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { PrismaModule } from './../prisma/prisma.module';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';

@Module({
	imports: [PrismaModule],
	controllers: [FileController],
	providers: [
		FileService,
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
	]
})
export class FileModule {}

