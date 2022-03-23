import { IsNotEmpty } from 'class-validator';

export class FileDto {
  @IsNotEmpty({ message: 'The file should have a name' })
  name: string;
  size: number;
  date: Date;
}
