import { PrismaService } from 'src/prisma/prisma.service';
import UpdateUserSettingsDto from './dtos/updateUserSettings.dto';
import UserSettingsResponse from './dtos/userSettingsRespose.dto';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class UserSettingsService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(): Promise<UserSettingsResponse[]> {
		return await (
			await this.prismaService.userSettings.findMany()
		).map((userSettings) => new UserSettingsResponse(userSettings));
	}

	async findOne(id: number): Promise<UserSettingsResponse> {
		const userSettings = await await this.prismaService.userSettings.findUnique(
			{
				where: {
					id
				}
			}
		);

		if (!userSettings) {
			throw new NotFoundException();
		}

		return new UserSettingsResponse(userSettings);
	}

	async update(id: number, body: UpdateUserSettingsDto) {
		const userSettings = this.prismaService.userSettings.findUnique({
			where: {
				id
			}
		});

		if (!userSettings) {
			throw new NotFoundException();
		}

		const updatedUserSettings = await this.prismaService.userSettings.update({
			where: {
				id
			},
			data: body
		});

		return new UserSettingsResponse(updatedUserSettings);
	}

	async delete(id: number) {
		await this.prismaService.userSettings.delete({
			where: {
				user_id: id
			}
		});
	}
}
