import { IsNotEmpty } from 'class-validator';
import { Languages } from '@prisma/client';
import { IsEnum, IsString } from 'class-validator';

export default class CreateUserSettingsDto {
  @IsEnum(Languages)
  @IsNotEmpty()
	language: Languages;

	@IsString()
  @IsNotEmpty()
  color: String;
}
