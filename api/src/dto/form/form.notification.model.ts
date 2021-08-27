import { Field, ID, InterfaceType, ObjectType } from '@nestjs/graphql'
import { FormNotificationEntity } from '../../entity/form.notification.entity'

@ObjectType('FormNotification')
export class FormNotificationModel {
  @Field(() => ID)
  readonly id: string

  @Field({ nullable: true })
  readonly subject?: string

  @Field({ nullable: true })
  readonly htmlTemplate?: string

  @Field({ nullable: true })
  readonly toField?: string

  @Field({ nullable: true })
  readonly fromEmail?: string

  @Field({ nullable: true })
  readonly fromField?: string

  @Field({ nullable: true })
  readonly toEmail?: string

  @Field()
  readonly enabled: boolean

  constructor(partial: Partial<FormNotificationEntity>) {
    this.id = partial.id.toString()
    this.subject = partial.subject
    this.htmlTemplate = partial.htmlTemplate
    this.enabled = partial.enabled
    this.toField = partial.toField?.id.toString()
    this.toEmail = partial.toEmail
    this.fromField = partial.fromField?.id.toString()
    this.fromEmail = partial.fromEmail
  }
}
