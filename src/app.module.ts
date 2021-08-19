import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileController } from './file/file.controller';
import { FileModule } from './file/file.module';

@Module({
  imports: [FileModule],
  controllers: [AppController, FileController],
  providers: [AppService],
})
export class AppModule {}
