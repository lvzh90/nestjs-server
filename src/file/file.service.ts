import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDto } from './dto/file.dto';
import { FileDocument } from './interface/file.interface';
import { File } from './schema/file.schema';

@Injectable()
export class FileService {

    constructor( @InjectModel(File.name) private readonly fileModel: Model<FileDocument>) {}

    async uploadFile(fileDto: FileDto) {
        const file = new this.fileModel(fileDto);
        return await file.save();
    }

    async getFiles(): Promise<FileDocument[]> {
        const files = await this.fileModel.find();
        return files;
    }

    async getFile(fileId: string): Promise<FileDocument> {
        const file = await this.fileModel.findById(fileId);
        return file;
    }

    async deleteFile(fileId: string): Promise<FileDocument> {
       return await this.fileModel.findByIdAndDelete(fileId);
    }

    async updateFile(fileId: string, fileDto: FileDto): Promise<FileDocument> {
        const updateFile = this.fileModel.findByIdAndUpdate(fileId, fileDto, {new: true});
        return updateFile;
    }
    
}
