import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export default class UpdateProductDto {
	@IsString()
	@IsNotEmpty()
	@IsOptional()
	name?: string;

	@IsNumber()
	@IsNotEmpty()
	@IsOptional()
	typeId?: number;
}
