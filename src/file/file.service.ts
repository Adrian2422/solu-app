import FileResponseDto from './dtos/fileResponse.dto';
import { PrismaService } from './../prisma/prisma.service';
import {
	ClassSerializerInterceptor,
	Injectable,
	UseInterceptors,
	NotFoundException
} from '@nestjs/common';
import CreateFileDto from './dtos/createFile.dto';
import UpdateFileDto from './dtos/updateFile.dto';

@Injectable()
export class FileService {
	constructor(private readonly prismaService: PrismaService) {}

	@UseInterceptors(ClassSerializerInterceptor)
	async findAll(): Promise<FileResponseDto[]> {
		return await (
			await this.prismaService.file.findMany()
		).map((file) => new FileResponseDto(file));
	}

	@UseInterceptors(ClassSerializerInterceptor)
	async findOne(id: number): Promise<FileResponseDto> {
		const file = await this.prismaService.file.findUnique({ where: { id } });

		if (!file) {
			throw new NotFoundException();
		}

		return new FileResponseDto(file);
	}

	async create({
		url,
		filename,
		ticketId
	}: CreateFileDto): Promise<FileResponseDto> {
		const file = await this.prismaService.file.create({
			data: {
				url,
				filename,
				ticket_id: ticketId
			}
		});

		return new FileResponseDto(file);
	}

	async update(
		id: number,
		{ url, filename }: UpdateFileDto
	): Promise<FileResponseDto> {
		const file = await this.prismaService.file.findUnique({ where: { id } });

		if (!file) {
			throw new NotFoundException();
		}

		const updatedFile = await this.prismaService.file.update({
			where: { id },
			data: {
				url,
				filename
			}
		});

		return new FileResponseDto(updatedFile);
	}

	async delete(id: number): Promise<FileResponseDto> {
		const deletedFile = await this.prismaService.file.delete({ where: { id } });

		return new FileResponseDto(deletedFile);
	}
}

