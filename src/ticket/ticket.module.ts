import { APP_INTERCEPTOR } from '@nestjs/core';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TicketController } from './ticket.controller';
import { TicketService } from './ticket.service';
import { ClassSerializerInterceptor, Module } from '@nestjs/common';

@Module({
	imports: [PrismaModule],
	controllers: [TicketController],
	providers: [
		TicketService,
		{ provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor }
	]
})
export class TicketModule {}

