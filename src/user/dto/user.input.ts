import { ObjectType, Field, InputType } from '@nestjs/graphql';

@InputType('UserInputType')
export class UserType {
  @Field({ nullable: false })
  userName!: string;

  @Field({ nullable: false })
  firstName!: string;

  @Field()
  lastName?: string;

  @Field({ nullable: false })
  email!: string;

  @Field({ nullable: false })
  password!: string;

  @Field({ nullable: false, defaultValue: Date.now })
  registrationDate!: Date;
}
