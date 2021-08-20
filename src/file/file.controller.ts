import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { renameFile, fileFilter } from './helper/file.helper';
//import { FileDto } from './dto/file.dto';
@Controller('file')
export class FileController {

    constructor(private readonly fileService: FileService) {}

    @Get(':filePath')
    getFile(@Param('filePath') file, @Res() res) {
        return res.sendFile(file, {root:'uploads'});
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
        console.log(file);
        return await this.fileService.uploadFile({ name: file.filename, size: file.size.toString(), date: "today"})
    }

}
