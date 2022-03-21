import * as bcrypt from 'bcryptjs';
import { PrismaService } from './../../prisma/prisma.service';
import { UserRoles } from '@prisma/client';
import { ConflictException, Injectable } from '@nestjs/common';

interface ISignupParams {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	role: UserRoles;
}

@Injectable()
export class AuthService {
	constructor(private readonly prismaService: PrismaService) {}

	async signup({
		firstName,
		lastName,
		email,
		phone,
		password,
		role,
	}: ISignupParams) {
		const userExists = await this.prismaService.users.findUnique({
			where: {
				email,
			},
		});

		if (userExists) {
			throw new ConflictException();
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = await this.prismaService.users.create({
			data: {
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				password: hashedPassword,
				role,
			},
		});

		return user;
	}
}
