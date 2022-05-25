import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export default class CreateFileDto {
	@IsString()
	@IsNotEmpty()
	url: string;

	@IsString()
	@IsNotEmpty()
	filename: string;

	@IsNumber()
	@IsNotEmpty()
	ticketId: number;
}
