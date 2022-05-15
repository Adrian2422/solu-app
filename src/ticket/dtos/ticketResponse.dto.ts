import { createParamDecorator } from '@nestjs/common';
import { File, TicketPriority, TicketType } from '@prisma/client';
import { Exclude, Expose } from "class-transformer";

export default class TicketResponseDto {
	id: number;

	title: string;

	description: string;

	priority: TicketPriority;

	@Exclude()
	creator_id: number;
	@Expose({name: 'creatorId'})
	creatorId() {
		return this.creator_id;
	}

	@Exclude()
	asignee_id: number;
	@Expose({name: 'asigneeId'})
	asigneeId() {
		return this.asignee_id
	}

	type: TicketType;

	@Exclude()
	product_id: number;
	@Expose({name: 'productId'})
	productId() {
		return this.product_id;
	}

	files: File[];

	constructor(partial: Partial<TicketResponseDto>) {
		Object.assign(this, partial);
	}
}
