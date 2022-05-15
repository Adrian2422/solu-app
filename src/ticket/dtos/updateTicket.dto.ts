import { TicketPriority, TicketType } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateTicketDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	title?: string;

	@IsOptional()
	@IsString()
	@IsNotEmpty()
	description?: string;

	@IsOptional()
	@IsEnum(TicketPriority)
	priority?: TicketPriority;

	@IsOptional()
	@IsNumber()
	@IsNotEmpty()
	creatorId?: number;

	@IsOptional()
	@IsNumber()
	@IsOptional()
	asigneeId?: number;

	@IsOptional()
	@IsEnum(TicketType)
	type?: TicketType;
}
