import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/files'), FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
