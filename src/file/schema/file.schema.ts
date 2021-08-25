import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class File {
    @Prop()
    name: string;

    @Prop()
    size: Number;

    @Prop()
    date: Date;
}

export const FileSchema = SchemaFactory.createForClass(File);
