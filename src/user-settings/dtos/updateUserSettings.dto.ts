import { IsOptional } from 'class-validator';
import { Languages } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export default class UpdateUserSettingsDto {
	@IsEnum(Languages)
	@IsOptional()
	@IsNotEmpty()
	language?: Languages;

	@IsString()
	@IsOptional()
	@IsNotEmpty()
	color?: string;
}
