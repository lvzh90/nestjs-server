import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { FileDto } from '../dto/file.dto';

@Injectable()
export class FileListener {

  @OnEvent('edit.file')
  handleEditEvent( event: FileDto ) {
    console.log(event);
  }

}
