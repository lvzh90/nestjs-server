import { Module } from '@nestjs/common';
import { FileListener } from './listeners/file.listener';
import { MongooseModule } from '@nestjs/mongoose';
import { FileController } from './file.controller';
import { FileSchema, File } from './schema/file.schema';
import { FileService } from './file.service';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: File.name , schema: FileSchema }
        ]),
        EventEmitterModule.forRoot()
    ],
    controllers: [FileController],
    providers: [FileService, FileListener],
})
export class FileModule {}
