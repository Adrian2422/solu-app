import { ProductTypeController } from './product-type.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('ProductTypeController', () => {
	let controller: ProductTypeController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProductTypeController]
		}).compile();

		controller = module.get<ProductTypeController>(ProductTypeController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});

