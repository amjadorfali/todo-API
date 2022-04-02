import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
// import bcrypt from 'bcryptjs';

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
    // validate: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
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

UserSchema.pre('save', async function (next) {
  await this.validate();
  next();
  // if () {
  //   next(new Error('Invalid'));
  // } else {
  //   next();
  // }
});
// UserSchema.pre('save', function (next) {
//   // eslint-disable-next-line @typescript-eslint/no-this-alias
//   const user = this;

//   if (this.isModified('password') || this.isNew) {
//     bcrypt.genSalt(10, function (saltError, salt) {
//       if (saltError) {
//         return next(saltError);
//       } else {
//         bcrypt.hash(user.get('password'), salt, function (hashError, hash) {
//           if (hashError) {
//             return next(hashError);
//           }

//           user.set('password', hash);
//           next();
//         });
//       }
//     });
//   } else {
//     return next();
//   }
// });
