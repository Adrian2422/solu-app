import CreateFileDto from './dtos/createFile.dto';
import { FileService } from './file.service';
import UpdateFileDto from './dtos/updateFile.dto';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';

@Controller('api/file')
export class FileController {
	constructor(private readonly fileService: FileService){}

	@Get()
	findAll() {
		return this.fileService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', ParseIntPipe) fileId: number) {
		return this.fileService.findOne(fileId);
	}

	@Post()
	create(@Body() createFileDto: CreateFileDto) {
		return this.fileService.create(createFileDto);
	}

	@Patch(':id')
	update(@Param('id', ParseIntPipe) fileId: number, @Body() updateFileDto: UpdateFileDto) {
		return this.fileService.update(fileId, updateFileDto);
	}

	@Delete(':id')
	delete(@Param('id', ParseIntPipe) fileId: number) {
		return this.fileService.delete(fileId);
	}
}
