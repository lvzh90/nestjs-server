import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FileDto } from './dto/file.dto';
import { FileDocument } from './interface/file.interface';
import { File } from './schema/file.schema';

@Injectable()
export class FileService {
  constructor(
    @InjectModel(File.name) private readonly fileModel: Model<FileDocument>,
  ) {}

  uploadFile(fileDto: FileDto) {
    return new this.fileModel(fileDto).save();
  }

  getFiles() {
    return this.fileModel.find();
  }

  getFile(fileId: string) {
    return this.fileModel.findById(fileId);
  }

  deleteFile(fileId: string) {
    return this.fileModel.findByIdAndDelete(fileId);
  }

  async updateFile(fileId: string, fileDto: FileDto): Promise<FileDocument> {
    const updateFile = this.fileModel.findByIdAndUpdate(fileId, fileDto, {
      new: true,
    });
    return updateFile;
  }
}
