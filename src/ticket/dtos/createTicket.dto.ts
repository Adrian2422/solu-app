import { TicketPriority, TicketType } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
export default class CreateTicketDto {
	@IsString()
	@IsNotEmpty()
	title: string;

	@IsString()
	@IsNotEmpty()
	description: string;

	@IsEnum(TicketPriority)
	priority: TicketPriority

	@IsNumber()
	@IsOptional()
	asigneeId?: number;

	@IsNumber()
	@IsNotEmpty()
	productId: number;

	@IsEnum(TicketType)
	type: TicketType;

}
