import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Todo {
  @Field({ nullable: false })
  id!: string;

  @Field({ nullable: false })
  action!: string;

  //TODO : ADD Default Values ??
  @Field({ nullable: false })
  category!: string;

  @Field({ nullable: false })
  isDone!: boolean;
}
