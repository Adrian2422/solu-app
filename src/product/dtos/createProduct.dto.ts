import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateProductDto {
	@IsString()
	@IsNotEmpty()
	name: string;

	@IsNumber()
	@IsNotEmpty()
	typeId: number;
}
