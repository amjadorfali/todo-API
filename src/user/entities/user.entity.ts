import { ObjectType, Field } from '@nestjs/graphql';
import { Todo } from 'src/todo/entities/todo.entity';
@ObjectType()
export class UserEntity {
  @Field({ nullable: false })
  id!: string;

  @Field({ nullable: false })
  userName!: string;

  @Field({ nullable: false })
  firstName!: string;

  @Field({ nullable: true })
  lastName?: string;

  @Field({ nullable: false })
  email!: string;

  @Field({ nullable: false })
  registrationDate!: Date;

  @Field({ nullable: false })
  registrationNumber!: number;

  @Field(() => [Todo], { nullable: true, name: 'todos' })
  todos?: Todo[];
}
