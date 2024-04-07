import { InputType, Field,  } from '@nestjs/graphql';
import { Upload } from '../scalars/upload.scalar';

@InputType()
export class AddImagessInput {
  @Field(() => [Upload], { description: 'Input for the image files.' })
  images: Upload[];  // to be saved in fileAssignment
}
