import { Exclude, Expose } from 'class-transformer';
export default class ProductResponseDto {
	id: number;

	name: string;

	@Exclude()
	type_id: number;
	@Expose({name: 'typeId'})
	typeId() {
		return this.type_id;
	}

	constructor(partial: Partial<ProductResponseDto>) {
		Object.assign(this, partial);
	}
}
