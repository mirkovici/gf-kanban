import { ObjectType, Field, ID, GraphQLISODateTime } from '@nestjs/graphql';

@ObjectType() // Ensures the class is recognized as a GraphQL type
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  // Do not include sensitive fields like password in GraphQL output
  // You can add @Field() here only if you are exposing the password for a specific purpose
  password?: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;
}
