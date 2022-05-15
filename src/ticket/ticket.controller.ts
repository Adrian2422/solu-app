import CreateTicketDto from './dtos/createTicket.dto';
import { IUserType } from './../user/interfaces/IUserType';
import { TicketService } from './ticket.service';
import { UpdateTicketDto } from './dtos/updateTicket.dto';
import { User } from 'src/decorators/user.decorator';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('api/ticket')
export class TicketController {
	constructor(private readonly ticketService: TicketService){}

	@Get()
	findAll() {
		return this.ticketService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) ticketId: number) {
		return this.ticketService.findOne(ticketId)
	}

	@Post()
	create(@Body() createTicketDto: CreateTicketDto, @User() _user: IUserType) {
		return this.ticketService.create(createTicketDto, _user.id);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateTicketDto: UpdateTicketDto) {
		return this.ticketService.update(id, updateTicketDto);
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.ticketService.delete(id);
	}
}
