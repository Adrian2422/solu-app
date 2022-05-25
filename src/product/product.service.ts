import CreateProductDto from './dtos/createProduct.dto';
import { PrismaService } from './../prisma/prisma.service';
import ProductResponseDto from './dtos/productResponse.dto';
import UpdateProductDto from './dtos/updateProduct.dto';
import {
	ClassSerializerInterceptor,
	Injectable,
	NotFoundException,
	UseInterceptors
} from '@nestjs/common';

@Injectable()
export class ProductService {
	constructor(private readonly prismaService: PrismaService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	async findAll(): Promise<ProductResponseDto[]> {
		return (await this.prismaService.product.findMany()).map(
			(product) => new ProductResponseDto(product)
		);
	}

	@UseInterceptors(ClassSerializerInterceptor)
	async findOne(id: number): Promise<ProductResponseDto> {
		const product = await this.prismaService.product.findUnique({
			where: { id }
		});

		if (!product) {
			throw new NotFoundException();
		}

		return new ProductResponseDto(product);
	}

	async create({
		name,
		typeId
	}: CreateProductDto): Promise<ProductResponseDto> {
		const product = await this.prismaService.product.create({
			data: { name, type_id: typeId }
		});

		return new ProductResponseDto(product);
	}

	async update(
		id: number,
		{ name, typeId }: UpdateProductDto
	): Promise<ProductResponseDto> {
		const product = await this.prismaService.product.findUnique({
			where: { id }
		});

		if (!product) {
			throw new NotFoundException();
		}

		const updatedProduct = await this.prismaService.product.update({
			where: { id },
			data: {
				name,
				type_id: typeId
			}
		});
		return new ProductResponseDto(updatedProduct);
	}

	async delete(id: number): Promise<ProductResponseDto> {
		// TODO: file and ticket constraints again
		await this.prismaService.product.update({
			where: {
				id
			},
			data: {
				tickets: {
					deleteMany: {}
				}
			}
		});
		const deletedProduct = await this.prismaService.product.delete({
			where: { id }
		});

		return new ProductResponseDto(deletedProduct);
	}
}

