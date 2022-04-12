import { IUserType } from './interfaces/IUserType';
import { AuthGuard } from './../guards/auth.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { Roles } from 'src/decorators/roles.decorator';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UserRoles } from '@prisma/client';
import { UserService } from './user.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { User } from 'src/decorators/user.decorator';

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Roles(UserRoles.ADMIN, UserRoles.SUPERUSER)
	@UseGuards(AuthGuard)
	@Get()
	findAll() {
		return this.userService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) userId: number) {
		return this.userService.findOne(userId);
	}

	@Post()
	create(@Body() createUserDto: CreateUserDto, @User() user: IUserType) {
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
