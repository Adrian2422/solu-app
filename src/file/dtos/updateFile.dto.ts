import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateFileDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	url?: string;

	@IsString()
	@IsNotEmpty()
	@IsOptional()
	filename?: string;
}
