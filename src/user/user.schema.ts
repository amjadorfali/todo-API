import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User {
  @Prop({
    required: true,
    unique: true,
    alias: 'registrationNumber',
  })
  registration_number!: number;
  @Prop({
    minlength: 3,
    maxlength: 20,
    unique: true,
    alias: 'userName',
    required: true,
  })
  user_name!: string;

  @Prop({ required: true, alias: 'firstName' })
  first_name!: string;

  @Prop({ alias: 'lastName' })
  last_name?: string;

  @Prop({
    unique: true,
    required: true,
    validate: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  })
  email!: string;

  @Prop({
    required: true,
    minlength: 8,
  })
  password!: string;
  @Prop({
    default: Date.now,
    required: false,
    auto: true,
    alias: 'registrationDate',
  })
  registration_date!: Date;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
