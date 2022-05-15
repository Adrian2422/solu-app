import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { TicketModule } from './ticket/ticket.module';
import { UserInterceptor } from './interceptors/user.interceptor';
import { UserModule } from './user/user.module';
import { UserSettingsModule } from './user-settings/user-settings.module';

@Module({
	imports: [ UserModule, PrismaModule, UserSettingsModule, TicketModule ],
	controllers: [AppController],
	providers: [
		AppService,
		{
			provide: APP_INTERCEPTOR,
			useClass: UserInterceptor
		}
	]
})
export class AppModule {}
