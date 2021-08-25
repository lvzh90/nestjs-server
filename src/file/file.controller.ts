import { Controller, Get, Post, Put, Delete, Res, Param, UploadedFile, UseInterceptors, HttpStatus, NotFoundException, Query, Body } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { renameFile, fileFilter } from './helper/file.helper';
import { FileDto } from './dto/file.dto';

@Controller('file')
export class FileController {

    constructor(
        private readonly fileService: FileService,
        private eventEmitter: EventEmitter2
    ) {}

    @Get()
    async getFiles(@Res() res) {
        const files = await this.fileService.getFiles();
        return res.status(HttpStatus.OK).json(files);
    }

    @Get('download/:fileName')
    downloadFile(@Param('fileName') file, @Res() res) {
        return res.sendFile(file, {root:'uploads'}, (err) => {
            if (err) {
                return res.status(HttpStatus.NOT_FOUND).json({
                        message: `File not found: ${file}`
                    })
            } 
        });
    }

    @Get(':fileId')
    async getFile(@Param('fileId') fileId, @Res() res) {
        const file = await this.fileService.getFile(fileId);
        console.log(file)
        if (!file) throw new NotFoundException('File does not exist');
        return res.status(HttpStatus.OK).json(file);
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage({
            destination: './uploads',
            filename: renameFile
        }),
        fileFilter: fileFilter
    }))
    async uploadFile(@UploadedFile() file: Express.Multer.File) {
        const fileDto = new FileDto();
        fileDto.name = file.filename;
        fileDto.size = file.size;
        fileDto.date = new Date();
        return await this.fileService.uploadFile(fileDto);
    }

    @Put('update')
    async editFile(@Res() res, @Body() fileDto: FileDto, @Query('fileId') fileId) {
        const updateFile = await this.fileService.updateFile(fileId, fileDto);
        if (!updateFile) throw new NotFoundException('File does not exist');

        this.eventEmitter.emit('edit.file', updateFile);

        return res.status(HttpStatus.OK).json({
            message: 'Updated successfully',
            updateFile
        });
    }

    @Delete('remove')
    async deleteFile(@Res() res, @Query('fileId') fileId) {
        const fileDeleted = await this.fileService.deleteFile(fileId);
        if (!fileDeleted) throw new NotFoundException('File does not exist');
        return res.status(HttpStatus.OK).json({
            message: 'File deleted successfully',
            fileDeleted
        });

    }

}
