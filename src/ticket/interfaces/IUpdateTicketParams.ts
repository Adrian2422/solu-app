import { TicketPriority, TicketType } from '@prisma/client';

export default interface IUpdateTicketParams {
	title?: string;
	description?: string;
	priority?: TicketPriority;
	asigneeId?: number;
	type?: TicketType;
}
