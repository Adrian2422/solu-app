import CreateProductDto from './dtos/createProduct.dto';
import ProductResponseDto from './dtos/productResponse.dto';
import { ProductService } from './product.service';
import UpdateProductDto from './dtos/updateProduct.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('api/product')
export class ProductController {
	constructor(private readonly productService: ProductService){}

	@Get()
	findAll(): Promise<ProductResponseDto[]> {
		return this.productService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) productId: number): Promise<ProductResponseDto> {
		return this.productService.findOne(productId);
	}

	@Post()
	create(@Body() createProductDto: CreateProductDto): Promise<ProductResponseDto> {
		return this.productService.create(createProductDto);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
		return this.productService.update(id, updateProductDto);
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number): Promise<ProductResponseDto> {
		return this.productService.delete(id);
	}
}
