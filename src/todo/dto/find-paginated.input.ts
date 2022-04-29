import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FindPaginatedTodosInput {
  @Field({ nullable: true, defaultValue: 20 })
  limit!: number;

  @Field({ nullable: true, defaultValue: 0 })
  page!: number;
}
