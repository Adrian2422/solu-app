export default class ProductTypeResponseDto {
	name: string;

	constructor(partial: Partial<ProductTypeResponseDto>) {
		Object.assign(this, partial);
	}
}
