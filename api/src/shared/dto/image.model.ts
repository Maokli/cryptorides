import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Image {
  @Field({ nullable: false })
  url: string;
}