import * as bcrypt from 'bcryptjs';
import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';

const randomUsersCount = 10;
const prisma = new PrismaClient();

function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}

async function main(): Promise<void> {
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
			isBlocked: false,
		},
	});

	generateUsers();
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});

async function generateUsers() {
	const users = [];

	for (let i = 0; i < randomUsersCount; i++) {
		users[i] = {
			first_name: faker.name.firstName(),
			last_name: faker.name.lastName(),
			email: faker.internet.email(),
			password: await hashPassword('P0klik4$'),
			phone: faker.phone.phoneNumber('###-###-###'),
			role: 'USER',
			isBlocked: false,
		};
	}

	await prisma.user.createMany({
		data: users,
	});
}
