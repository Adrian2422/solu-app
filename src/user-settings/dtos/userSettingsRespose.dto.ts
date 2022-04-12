import { Languages } from '@prisma/client';

export default class UserSettingsResponse {
	language: Languages;
	color: string;

	constructor(partial: Partial<UserSettingsResponse>) {
		Object.assign(this, partial);
	}
}
