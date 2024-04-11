import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsNotEmpty, Min, MinDate, Validate } from 'class-validator';
import { ValidationArguments, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';

@ValidatorConstraint({ name: 'DateRange', async: false })
export class DateRangeConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const obj = args.object as CreateRentalcarInput;

    // Check if reservedto is greater than or equal to reservedfrom
    return obj.reservedto >= obj.reservedfrom;
  }

  defaultMessage(args: ValidationArguments) {
    return 'reservedto must be greater than or equal to reservedfrom';
  }
}

@InputType()
export class CreateRentalcarInput {
  @Field(() => Date)
  @IsDate()
  reservedfrom: Date;

  @Field(() => Date)
  @IsDate()
  @Validate(DateRangeConstraint, {
    message: 'reservedto must be greater than or equal to reservedfrom',
  })
  reservedto: Date;

  @Field(() => Int)
  @IsNotEmpty()
  carId: number;
}
