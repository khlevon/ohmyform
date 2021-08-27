import { Field, ID, InputType } from '@nestjs/graphql'
import { FormFieldLogicInput } from './form.field.logic.input'
import { FormFieldLogicModel } from './form.field.logic.model'
import { FormFieldOptionInput } from './form.field.option.input'
import { FormFieldRatingInput } from './form.field.rating.input'

@InputType()
export class FormFieldInput {
  @Field(() => ID)
  readonly id: string

  @Field()
  readonly title: string

  @Field()
  readonly type: string

  @Field({ nullable: true })
  readonly slug?: string

  @Field()
  readonly description: string

  @Field()
  readonly required: boolean

  @Field()
  readonly value: string

  @Field({ nullable: true })
  readonly disabled?: boolean

  @Field(() => [FormFieldOptionInput], { nullable: true })
  readonly options: FormFieldOptionInput[]

  @Field(() => [FormFieldLogicInput], { nullable: true })
  readonly logic: FormFieldLogicInput[]

  @Field(() => FormFieldRatingInput, { nullable: true })
  readonly rating: FormFieldRatingInput
}
