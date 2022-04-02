import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field({ description: 'User Name', nullable: false })
  userName!: string;
  @Field({ description: 'First Name', nullable: false })
  firstName!: string;
  @Field({ description: 'Last Name', nullable: true })
  lastName?: string;
  @Field({ description: 'Email', nullable: false })
  email!: string;
  @Field({ description: 'Pass', nullable: false })
  password!: string;
}
