import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { User, UserDocument } from 'src/user/user.schema';
@Schema()
export class Todo {
  @Prop({ required: true })
  action!: string;

  //FIXME Change requireed to true
  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user!: UserDocument;
}

export type TodoDocument = Todo & Document;
export const TodoSchema = SchemaFactory.createForClass(Todo);
// const UserTC = composeWithMongoose(Todo, {
//   fields: {
//     useAlias: true
//   }
// });

// mongoose.model
