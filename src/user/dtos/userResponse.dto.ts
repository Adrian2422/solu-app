import { Exclude, Expose } from 'class-transformer';
import { UserRoles } from '@prisma/client';

export class UserResponseDto {
	id: number;

	@Exclude()
	first_name: string;

	@Expose({ name: 'firstName' })
	firstName() {
		return this.first_name;
	}

	@Exclude()
	last_name: string;

	@Expose({ name: 'lastName' })
	lastName() {
		return this.last_name;
	}

	email: string;
	phone: string;

	@Exclude()
	password: string;

	role: UserRoles;

	@Exclude()
	is_blocked: boolean;

	@Expose({ name: 'isBlocked' })
	isBlocked() {
		return this.is_blocked;
	}

	@Exclude()
	created_at: Date;

	@Exclude()
	updated_at: Date;

	constructor(partial: Partial<UserResponseDto>) {
		Object.assign(this, partial);
	}
}
