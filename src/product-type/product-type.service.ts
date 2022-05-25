import CreateProductTypeDto from './dtos/createProductType.dto';
import IUpdateProductTypeParams from './interfaces/IUpdateProductTypeParams';
import { PrismaService } from './../prisma/prisma.service';
import ProductTypeResponseDto from './dtos/productTypeResponse.dto';
import {
	ClassSerializerInterceptor,
	Injectable,
	NotFoundException,
	UseInterceptors
} from '@nestjs/common';

@Injectable()
export class ProductTypeService {
	constructor(private readonly prismaService: PrismaService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	async findAll(): Promise<ProductTypeResponseDto[]> {
		return await (
			await this.prismaService.productType.findMany()
		).map((productType) => new ProductTypeResponseDto(productType));
	}

	@UseInterceptors(ClassSerializerInterceptor)
	async findOne(id: number): Promise<ProductTypeResponseDto> {
		const productType = await this.prismaService.productType.findUnique({
			where: {
				id
			}
		});

		if (!productType) {
			throw new NotFoundException();
		}

		return new ProductTypeResponseDto(productType);
	}

	async create({ name }: CreateProductTypeDto) {
		const productType = await this.prismaService.productType.create({
			data: {
				name
			}
		});

		return new ProductTypeResponseDto(productType);
	}

	async update(id: number, { name }: IUpdateProductTypeParams) {
		const productType = await this.prismaService.productType.findUnique({
			where: {
				id
			}
		});

		if (!productType) {
			throw new NotFoundException();
		}

		const updatedProductType = await this.prismaService.productType.update({
			where: {
				id
			},
			data: {
				name
			}
		});

		return new ProductTypeResponseDto(updatedProductType);
	}

	async delete(id: number) {
		await this.prismaService.productType.update({
			// TODO: Ticket constraint error, have to remove ticket referencing products too
			where: { id },
			data: { asigned_products: { deleteMany: {} } }
		});

		const deletedProductType = await this.prismaService.productType.delete({
			where: { id }
		});

		return new ProductTypeResponseDto(deletedProductType);
	}
}

