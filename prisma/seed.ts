import * as bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker';
import {
	Languages,
	PrismaClient,
	TicketPriority,
	TicketType,
	UserRoles
} from '@prisma/client';

const randomUsersCount = 50;
const randomProductTypeCount = 5;
const randomProductCount = 100;
const randomTicketsCount = 200;
const randomFilesCount = 500;
const prisma = new PrismaClient();

function hashPassword(password: string): Promise<string> {
	const saltRounds = 10;
	return bcrypt.hash(password, saltRounds);
}

async function main(): Promise<void> {
	generateAdmin();
	generateProductTypes()
		.then(() => generateUsers())
		.then(() => generateProducts())
		.then(() => generateTickets())
		.then(() => generateFiles())
		.catch((error) => console.log(error.message));
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
				role: randomEnum(UserRoles),
				is_blocked: faker.datatype.boolean(),
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

async function generateProductTypes() {
	for (let i = 0; i < randomProductTypeCount; i++) {
		await prisma.productType.create({
			data: {
				name: `productType${i}`
			}
		});
	}
}

async function generateProducts() {
	for (let i = 0; i < randomProductCount; i++) {
		await prisma.product.create({
			data: {
				name: `Product${i}`,
				type_id: randomIntFromInterval(1, randomProductTypeCount)
			}
		});
	}
}

async function generateFiles() {
	for (let i = 0; i < randomFilesCount; i++) {
		await prisma.file.create({
			data: {
				filename: `${faker.lorem
					.words(randomIntFromInterval(1, 5))
					.split(' ')
					.join('_')}.jpg`,
				url: faker.internet.url(),
				ticket_Id: randomIntFromInterval(1, randomTicketsCount)
			}
		});
	}
}

async function generateTickets() {
	for (let i = 0; i < randomTicketsCount; i++) {
		await prisma.ticket.create({
			data: {
				title: faker.lorem.words(randomIntFromInterval(1, 5)),
				description: faker.lorem.text(),
				priority: randomEnum(TicketPriority),
				creator_id: randomIntFromInterval(1, randomUsersCount),
				asignee_id: randomIntFromInterval(1, randomUsersCount),
				type: randomEnum(TicketType),
				product_id: randomIntFromInterval(1, randomProductCount)
			}
		});
	}
}

function randomIntFromInterval(min, max) {
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomEnum<T>(targetEnum: T, numerical = false): T[keyof T] {
	const enumValues = Object.keys(targetEnum)
		.map((n) => (numerical ? Number.parseInt(n) : n))
		.filter((n) => !Number.isNaN(n)) as unknown as T[keyof T][];
	const randomIndex = Math.floor(Math.random() * enumValues.length);
	const randomEnumValue = enumValues[randomIndex];
	return randomEnumValue;
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
