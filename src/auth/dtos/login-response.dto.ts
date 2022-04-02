import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('LoginResponse')
export class LoginResponseDTO {
  @Field()
  accessToken!: string;
}
