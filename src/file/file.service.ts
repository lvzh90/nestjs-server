import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDto } from './dto/file.dto';
import { FileDocument } from './interface/file.interface';
import { File } from './schema/file.schema';

@Injectable()
export class FileService {

    constructor( @Inject(File.name) private readonly fileModel: Model<FileDocument>) {}

    async uploadFile(fileDto: FileDto) {
        const file = new this.fileModel(fileDto);
        return await file.save();
    }
}
