import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { UserDocument } from 'src/user/user.schema';
@Schema()
export class Todo {
  @Prop({ required: true })
  action!: string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user!: UserDocument;

  @Prop({ required: true, default: 'General' })
  category?: string;

  @Prop({ required: true, default: false, alias: 'isDone' })
  is_done?: boolean;

  @Prop({
    default: Date.now,
    required: false,
    auto: true,
    alias: 'createdAt',
  })
  created_at!: Date;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
