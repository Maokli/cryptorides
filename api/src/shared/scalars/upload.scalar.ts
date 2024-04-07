import { Scalar } from '@nestjs/graphql';
// import * as graphqlUploadExpress from 'graphql-upload/GraphQLUploadExpress.js';

@Scalar('Upload')
export class Upload {
  description = 'Upload files';
  /*
  parseValue(value) {
    return graphqlUploadExpress.parseValue(value);
  }

  serialize(value) {
    return graphqlUploadExpress.serialize(value);
  }

  parseLiteral(ast) {
    return graphqlUploadExpress.parseLiteral(ast, ast.value);
  }
  */
}