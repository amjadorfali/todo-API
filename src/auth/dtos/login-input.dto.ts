import { Field, InputType } from '@nestjs/graphql';

@InputType('LoginInput')
export class LoginInputDTO {
  @Field()
  userName!: string;

  @Field()
  password!: string;
}
