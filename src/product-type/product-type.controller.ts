import CreateProductTypeDto from './dtos/createProductType.dto';
import { ProductTypeService } from './product-type.service';
import UpdateProductTypeDto from './dtos/updateProductType.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('api/product-type')
export class ProductTypeController {
	constructor(private readonly productTypeService: ProductTypeService){}

	@Get()
	findAll() {
		return this.productTypeService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) productTypeId: number) {
		return this.productTypeService.findOne(productTypeId);
	}

	@Post()
	create(@Body() createProductTypeDto: CreateProductTypeDto) {
		return this.productTypeService.create(createProductTypeDto);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) id: number, @Body() updateProductTypeDto: UpdateProductTypeDto) {
		return this.productTypeService.update(id, updateProductTypeDto);
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) id: number) {
		return this.productTypeService.delete(id);
	}
}
