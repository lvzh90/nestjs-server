import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class File {
    @Prop()
    name: string;

    @Prop()
    size: String;

    @Prop()
    date: String;
}

export const FileSchema = SchemaFactory.createForClass(File);