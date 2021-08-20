import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';
import { FileService } from './file/file.service';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/files'),
    FileModule
  ],
  controllers: [AppController, FileController],
  providers: [AppService, FileService],
})
export class AppModule {}
