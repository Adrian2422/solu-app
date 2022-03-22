import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { PrismaService } from './../../prisma/prisma.service';
import { UserRoles } from '@prisma/client';
import { ConflictException, HttpException, Injectable } from '@nestjs/common';

interface ISignupParams {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	password: string;
	role: UserRoles;
}

interface ISigninParams {
	email: string;
	password: string;
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
	}: ISignupParams): Promise<string> {
		const userExists = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (userExists) {
			throw new ConflictException();
		}

		const saltRounds = 10;
		const hashedPassword = await bcrypt.hash(password, saltRounds);

		const user = await this.prismaService.user.create({
			data: {
				first_name: firstName,
				last_name: lastName,
				email,
				phone,
				password: hashedPassword,
				role,
			},
		});

		return await this.generateJWT(firstName, lastName, user.id);
	}

	async signin({ email, password }: ISigninParams): Promise<string> {
		const user = await this.prismaService.user.findUnique({
			where: {
				email,
			},
		});

		if (!user) {
			throw new HttpException('Invalid credentials', 400);
		}

		const hashedPassword = user.password;

		const isValidPassword = await bcrypt.compare(password, hashedPassword);

		if (!isValidPassword) {
			throw new HttpException('Invalid credencials', 400);
		}

		return await this.generateJWT(user.first_name, user.last_name, user.id);
	}

	generateJWT(firstName: string, lastName: string, id: number): string {
		return jwt.sign(
			{
				firstName,
				lastName,
				id,
			},
			process.env.JSON_TOKEN_KEY,
			{
				expiresIn: 3600,
			},
		);
	}
}
