import { IsOptional, IsString, IsNotEmpty } from "class-validator";

export default class UpdateProductTypeDto {
	@IsOptional()
	@IsString()
	@IsNotEmpty()
	name: string;
}
