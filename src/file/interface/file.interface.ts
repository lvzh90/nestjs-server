import { Document } from 'mongoose';
import { File } from '../schema/file.schema';

export type FileDocument = File & Document;
