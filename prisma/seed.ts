import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import { Languages, PrismaClient } from '@prisma/client';

const randomUsersCount = 10;
const prisma = new PrismaClient();

function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}

async function main(): Promise<void> {
	generateAdmin();
	generateUsers();
}

async function generateAdmin() {
	await prisma.user.upsert({
		where: { email: 'admin@solu.com' },
		update: {},
		create: {
			first_name: 'Admin',
			last_name: 'Nimda',
			email: 'admin@solu.com',
			password: await hashPassword('P0klik4$'),
			phone: '111-222-333',
			role: 'ADMIN',
			is_blocked: false,
			user_settings: {
				create: {
					language: Languages.PL,
					color: faker.internet.color()
				}
			}
		}
	});
}

async function generateUsers() {
	for (let i = 0; i < randomUsersCount; i++) {
		await prisma.user.create({
			data: {
				first_name: faker.name.firstName(),
				last_name: faker.name.lastName(),
				email: faker.internet.email(),
				password: await hashPassword('P0klik4$'),
				phone: faker.phone.phoneNumber('###-###-###'),
				role: 'USER',
				is_blocked: false,
				user_settings: {
					create: {
						language: Languages.PL,
						color: faker.internet.color()
					}
				}
			}
		});
	}
}

// EXECUTE
main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
