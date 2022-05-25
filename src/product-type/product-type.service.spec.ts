import { ProductTypeService } from './product-type.service';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProductTypeService', () => {
	let service: ProductTypeService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			providers: [ProductTypeService]
		}).compile();

		service = module.get<ProductTypeService>(ProductTypeService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});
});

