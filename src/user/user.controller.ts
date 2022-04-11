import { CreateUserDto } from './dtos/createUser.dto';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) userId: number) {
		return this.userService.findOne(userId);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.userService.create(createUserDto);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.userService.update(id, updateUserDto);
	}

	@Patch('lock/:id')
	lockOrUnlock(@Param('id', ParseIntPipe) id: number) {
		return this.userService.lockOrUnlock(id);
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.userService.delete(id);
	}
}
