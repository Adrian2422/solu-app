import { Exclude, Expose } from "class-transformer";

export default class FileResponseDto {
	id: number;

	url: string;

	filename: string;

	@Exclude()
	ticket_id: number;
	@Expose({name: 'ticketId'})
	ticketId() {
		return this.ticket_id;
	}

	constructor(partial: Partial<FileResponseDto>) {
		Object.assign(this, partial);
	}
}
