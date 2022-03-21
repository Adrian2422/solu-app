import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	const admin = await prisma.users.upsert({
		where: { email: 'admin@solu.com' },
		update: {},
		create: {
			first_name: 'Admin',
			last_name: 'Nimda',
			email: 'admin@solu.com',
			password: 'admin',
			role: 'ADMIN',
			isBlocked: false,
		},
	});

	console.log({ admin });
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
