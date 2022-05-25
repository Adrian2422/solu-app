import { IsNotEmpty, IsString } from "class-validator";

export default class CreateProductTypeDto {
	@IsString()
	@IsNotEmpty()
	name: string;
}
