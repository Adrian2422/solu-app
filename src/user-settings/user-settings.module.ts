import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from './../prisma/prisma.module';
import { UserSettingsController } from './user-settings.controller';
import { UserSettingsService } from './user-settings.service';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';

@Module({
	imports: [PrismaModule],
	controllers: [UserSettingsController],
	providers: [
		UserSettingsService,
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
	]
})
export class UserSettingsModule {}
