import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Param,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  NotFoundException,
  Query,
  Body,
  StreamableFile,
} from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { FileService } from './file.service';
import { renameFile, fileFilter } from './helper/file.helper';
import { FileDto } from './dto/file.dto';
import { FileDocument } from './interface/file.interface';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Response } from 'express';

@Controller('file')
export class FileController {
  constructor(
    private readonly fileService: FileService,
    private eventEmitter: EventEmitter2,
  ) {}

 // @Get()
  async getFiles(@Res() res) : Promise<Object> {
    const files = await this.fileService.getFiles();
    return res.status(HttpStatus.OK).json(files);
  }

  @Get('download/:fileName')
  downloadFile(@Param('fileName') file, @Res() res) : Promise<Object> {
    return res.sendFile(file, { root: 'uploads' }, (err) => {
      if (err) {
        return res.status(HttpStatus.NOT_FOUND).json({
          message: `File not found: ${file}`,
        });
      }
    });
  }

  @Get(':fileId')
  async getFile(@Param('fileId') fileId, @Res() res) : Promise<Object> {
    const file = await this.fileService.getFile(fileId);
    console.log(file);
    if (!file) throw new NotFoundException('File does not exist');
    return res.status(HttpStatus.OK).json(file);
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: renameFile,
      }),
      fileFilter: fileFilter,
    }),
  )
  async uploadFile(@UploadedFile() file: Express.Multer.File) : Promise<FileDocument> {
    const fileDto = new FileDto();
    fileDto.name = file.filename;
    fileDto.size = file.size;
    fileDto.date = new Date();
    return await this.fileService.uploadFile(fileDto);
  }

  @Put('update')
  async editFile(
    @Res() res : Response,
    @Body() fileDto: FileDto,
    @Query('fileId') fileId,
  ) : Promise<Object> {
    const updateFile = await this.fileService.updateFile(fileId, fileDto);
    if (!updateFile) throw new NotFoundException('File does not exist');

    this.eventEmitter.emit('edit.file', updateFile);

    return res.status(HttpStatus.OK).json({
      message: 'Updated successfully',
      updateFile,
    });
  }

  @Delete('remove')
  async deleteFile(@Res() res : Response, @Query('fileId') fileId : string) : Promise<Object> {
    const fileDeleted = await this.fileService.deleteFile(fileId);
    if (!fileDeleted) throw new NotFoundException('File does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'File deleted successfully',
      fileDeleted,
    });
  }

  @Get()
  getTest() : StreamableFile {
    const file = createReadStream(join(process.cwd(), 'package.json'));
    console.log(file);
    return new StreamableFile(file);
  }

}
