import { UserSettingsController } from './user-settings.controller';
import { Test, TestingModule } from '@nestjs/testing';

describe('UserSettingsController', () => {
	let controller: UserSettingsController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			controllers: [UserSettingsController]
		}).compile();

		controller = module.get<UserSettingsController>(UserSettingsController);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});
});
