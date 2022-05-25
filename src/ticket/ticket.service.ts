import CreateTicketDto from './dtos/createTicket.dto';
import IUpdateTicketParams from './interfaces/IUpdateTicketParams';
import { PrismaService } from 'src/prisma/prisma.service';
import TicketResponseDto from './dtos/ticketResponse.dto';
import {
	ClassSerializerInterceptor,
	Injectable,
	NotFoundException,
	Query,
	UseInterceptors
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Prisma } from '@prisma/client';

@Injectable()
export class TicketService {
	constructor(private readonly prismaService: PrismaService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	async findAll(): Promise<TicketResponseDto[]> {
		return await (
			await this.prismaService.ticket.findMany()
		).map((ticket) => new TicketResponseDto(ticket));
	}

	@UseInterceptors(ClassSerializerInterceptor)
	async findOne(id: number): Promise<TicketResponseDto> {
		const ticket = await this.prismaService.ticket.findUnique({
			where: {
				id
			}
		});

		if (!ticket) {
			throw new NotFoundException();
		}

		return new TicketResponseDto(ticket);
	}

	async create(
		{
			title,
			description,
			priority,
			asigneeId,
			productId,
			type
		}: CreateTicketDto,
		creatorId: number
	) {
		const ticket = await this.prismaService.ticket.create({
			data: {
				title,
				description,
				priority,
				creator: { connect: { id: creatorId } },
				product: { connect: { id: productId } },
				type
			}
		});

		if (asigneeId) {
			await this.prismaService.ticket.update({
				where: {
					id: ticket.id
				},
				data: {
					asignee: { connect: { id: asigneeId } }
				}
			});
		}

		return new TicketResponseDto(ticket);
	}

	async update(
		id: number,
		{ title, description, priority, asigneeId, type }: IUpdateTicketParams
	) {
		const ticket = await this.prismaService.ticket.findUnique({
			where: { id }
		});

		if (!ticket) {
			throw new NotFoundException();
		}

		const updatedTicket = await this.prismaService.ticket.update({
			where: {
				id
			},
			data: {
				title,
				description,
				priority,
				asignee_id: asigneeId,
				type
			}
		});

		return new TicketResponseDto(updatedTicket);
	}

	async delete(id: number) {
		await this.prismaService.ticket.update({
			where: {
				id
			},
			data: {
				files: {
					deleteMany: {}
				}
			}
		});

		const deletedTicket = await this.prismaService.ticket.delete({
			where: {
				id
			}
		});

		return new TicketResponseDto(deletedTicket);
	}

	async offsetPaginate(
		skip: number,
		take: number
	): Promise<TicketResponseDto[]> {
		if (isNaN(skip)) {
			return await (
				await this.prismaService.ticket.findMany({ take })
			).map((ticket) => new TicketResponseDto(ticket));
		} else {
			return await (
				await this.prismaService.ticket.findMany({ skip, take })
			).map((ticket) => new TicketResponseDto(ticket));
		}
	}

	async cursorPaginate(
		cursor?: Prisma.TicketWhereUniqueInput,
		take?: number
	): Promise<TicketResponseDto[]> {

		return await (
			await this.prismaService.ticket.findMany({ skip: 1, take, cursor })
		).map((ticket) => new TicketResponseDto(ticket));
	}

}
