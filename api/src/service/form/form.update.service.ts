import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { FormUpdateInput } from '../../dto/form/form.update.input'
import { FormEntity } from '../../entity/form.entity'
import { FormFieldEntity } from '../../entity/form.field.entity'
import { FormFieldLogicEntity } from '../../entity/form.field.logic.entity'
import { FormFieldOptionEntity } from '../../entity/form.field.option.entity'
import { FormHookEntity } from '../../entity/form.hook.entity'
import { FormNotificationEntity } from '../../entity/form.notification.entity'
import { PageButtonEntity } from '../../entity/page.button.entity'
import { PageEntity } from '../../entity/page.entity'

@Injectable()
export class FormUpdateService {
  constructor(
    @InjectRepository(FormEntity)
    private readonly formRepository: Repository<FormEntity>,
    @InjectRepository(FormFieldEntity)
    private readonly formFieldRepository: Repository<FormFieldEntity>,
    @InjectRepository(FormHookEntity)
    private readonly formHookRepository: Repository<FormHookEntity>,
  ) {
  }

  async update(form: FormEntity, input: FormUpdateInput): Promise<FormEntity> {
    if (input.language !== undefined) {
      form.language = input.language
    }

    if (input.title !== undefined) {
      form.title = input.title
    }

    if (input.showFooter !== undefined) {
      form.showFooter = input.showFooter
    }

    if (input.isLive !== undefined) {
      form.isLive = input.isLive
    }

    if (input.fields !== undefined && !input.fields.find(field => field.id.includes('API'))) {
      form.fields = await Promise.all(input.fields.map(async (nextField) => {
        let field = form.fields.find(field => field.id?.toString() === nextField.id)

        if (!field) {
          field = new FormFieldEntity()
          field.type = nextField.type
        }

        if (nextField.title !== undefined) {
          field.title = nextField.title
        }

        if (nextField.description !== undefined) {
          field.description = nextField.description
        }

        if (nextField.disabled !== undefined) {
          field.disabled = nextField.disabled
        }

        if (nextField.required !== undefined) {
          field.required = nextField.required
        }

        if (nextField.value !== undefined) {
          field.value = nextField.value
        }

        if (nextField.slug !== undefined) {
          field.slug = nextField.slug
        }

        if (nextField.logic !== undefined) {
          field.logic = nextField.logic.map(nextLogic => {
            const logic = field.logic?.find(logic => logic.id?.toString() === nextLogic.id) || new FormFieldLogicEntity()

            logic.field = field

            if (nextLogic.formula !== undefined) {
              logic.formula = nextLogic.formula
            }
            if (nextLogic.action !== undefined) {
              logic.action = nextLogic.action as any
            }
            if (nextLogic.visible !== undefined) {
              logic.visible = nextLogic.visible
            }
            if (nextLogic.require !== undefined) {
              logic.require = nextLogic.require
            }
            if (nextLogic.disable !== undefined) {
              logic.disable = nextLogic.disable
            }
            if (nextLogic.jumpTo !== undefined) {
              logic.jumpTo = form.fields.find(value => value.id?.toString() === nextLogic.jumpTo)
            }
            if (nextLogic.enabled !== undefined) {
              logic.enabled = nextLogic.enabled
            }

            return logic
          })
        }

        if (nextField.options !== undefined) {
          field.options = nextField.options.map(nextOption => {
            const option = field.options?.find(option => option.id?.toString() === nextOption.id) || new FormFieldOptionEntity()

            option.field = field

            option.title = nextOption.title
            option.value = nextOption.value
            option.key = nextOption.key

            return option
          })
        }

        if (nextField.rating !== undefined) {
          field.rating = nextField.rating
        }

        return field
      }))

    }
    if (input.fields !== undefined && input.fields.find(field => field.id.includes('API'))) {
      const fields = await Promise.all(input.fields.map(async (nextField) => {
        let field = new FormFieldEntity()
       
        field.type = nextField.type

        if (nextField.title !== undefined) {
          field.title = nextField.title
        }

        if (nextField.description !== undefined) {
          field.description = nextField.description
        }

        if (nextField.disabled !== undefined) {
          field.disabled = nextField.disabled
        }

        if (nextField.required !== undefined) {
          field.required = nextField.required
        }

        if (nextField.value !== undefined) {
          field.value = nextField.value
        }

        if (nextField.slug !== undefined) {
          field.slug = nextField.slug
        }

        if (nextField.logic !== undefined) {
          field.logic = nextField.logic.map(nextLogic => {
            const logic = field.logic?.find(logic => logic.id?.toString() === nextLogic.id) || new FormFieldLogicEntity()

            logic.field = field

            if (nextLogic.formula !== undefined) {
              logic.formula = nextLogic.formula
            }
            if (nextLogic.action !== undefined) {
              logic.action = nextLogic.action as any
            }
            if (nextLogic.visible !== undefined) {
              logic.visible = nextLogic.visible
            }
            if (nextLogic.require !== undefined) {
              logic.require = nextLogic.require
            }
            if (nextLogic.disable !== undefined) {
              logic.disable = nextLogic.disable
            }
            if (nextLogic.jumpTo !== undefined) {
              logic.jumpTo = form.fields.find(value => value.id?.toString() === nextLogic.jumpTo)
            }
            if (nextLogic.enabled !== undefined) {
              logic.enabled = nextLogic.enabled
            }

            return logic
          })
        }

        if (nextField.options !== undefined) {
          field.options = nextField.options.map(nextOption => {
            const option = field.options?.find(option => option.id?.toString() === nextOption.id) || new FormFieldOptionEntity()

            option.field = field

            option.title = nextOption.title
            option.value = nextOption.value
            option.key = nextOption.key

            return option
          })
        }

        if (nextField.rating !== undefined) {
          field.rating = nextField.rating
        }

        return field
      }))

      form.fields = [
        ...form.fields,
        ...fields
      ]
    }

    if (input.hooks !== undefined && !input.hooks.find(hook => hook.id.includes('API'))) {
      form.hooks = input.hooks.map((nextHook) => {
        const hook = form.hooks?.find(hook => hook.id?.toString() === nextHook.id) || new FormHookEntity()

        // ability for other fields to apply mapping
        hook.url = nextHook.url
        hook.enabled = nextHook.enabled

        if (nextHook.format !== undefined) {
          hook.format = nextHook.format
        }

        return hook
      })

    }
    if (input.hooks !== undefined && input.hooks.find(hook => hook.id.includes('API'))) {
      const newHooks = input.hooks.map((nextHook) => {
        const hook = new FormHookEntity()

        // ability for other fields to apply mapping
        hook.url = nextHook.url
        hook.enabled = nextHook.enabled

        if (nextHook.format !== undefined) {
          hook.format = nextHook.format
        }

        return hook
      })
      form.hooks = [
        ...form.hooks,
        ...newHooks
      ]

    }

    if (input.design !== undefined) {
      if (input.design.font !== undefined) {
        form.design.font = input.design.font
      }

      if (input.design.colors !== undefined) {
        if (input.design.colors.answer !== undefined) {
          form.design.colors.answer = input.design.colors.answer
        }
        if (input.design.colors.buttonText !== undefined) {
          form.design.colors.buttonText = input.design.colors.buttonText
        }
        if (input.design.colors.background !== undefined) {
          form.design.colors.background = input.design.colors.background
        }
        if (input.design.colors.button !== undefined) {
          form.design.colors.button = input.design.colors.button
        }
        if (input.design.colors.buttonActive !== undefined) {
          form.design.colors.buttonActive = input.design.colors.buttonActive
        }
        if (input.design.colors.question !== undefined) {
          form.design.colors.question = input.design.colors.question
        }
      }
    }


    if (input.notifications !== undefined) {
      form.notifications = input.notifications.map(notificationInput => {
        const notification = form.notifications?.find(value => value.id?.toString() === notificationInput.id) || new FormNotificationEntity()

        notification.form = form
        notification.enabled = notificationInput.enabled

        if (notificationInput.fromEmail !== undefined) {
          notification.fromEmail = notificationInput.fromEmail
        }
        if (notificationInput.fromField !== undefined) {
          notification.fromField = form.fields.find(value => value.id?.toString() === notificationInput.fromField)
        }
        if (notificationInput.subject !== undefined) {
          notification.subject = notificationInput.subject
        }
        if (notificationInput.htmlTemplate !== undefined) {
          notification.htmlTemplate = notificationInput.htmlTemplate
        }
        if (notificationInput.toEmail !== undefined) {
          notification.toEmail = notificationInput.toEmail
        }
        if (notificationInput.toField !== undefined) {
          notification.toField = form.fields.find(value => value.id?.toString() === notificationInput.toField)
        }

        return notification
      })
    }

    /*
    if (input.respondentNotifications !== undefined) {
      form.set('respondentNotifications', {
        ...input.respondentNotifications,
        toField: extractField(input.respondentNotifications.toField)
      })
    }
    */

    if (input.startPage !== undefined) {
      if (!form.startPage) {
        form.startPage = new PageEntity()
        form.startPage.show = false
      }

      if (input.startPage.show !== undefined) {
        form.startPage.show = input.startPage.show
      }

      if (input.startPage.title !== undefined) {
        form.startPage.title = input.startPage.title
      }

      if (input.startPage.paragraph !== undefined) {
        form.startPage.paragraph = input.startPage.paragraph
      }

      if (input.startPage.buttonText !== undefined) {
        form.startPage.buttonText = input.startPage.buttonText
      }

      if (input.startPage.buttons !== undefined) {
        form.startPage.buttons = input.startPage.buttons.map(buttonInput => {
          const entity = form.startPage?.buttons?.find(value => value.id?.toString() === buttonInput.id) || new PageButtonEntity()
          entity.page = form.startPage
          entity.url = buttonInput.url
          entity.action = buttonInput.action
          entity.text = buttonInput.text
          entity.color = buttonInput.color
          entity.bgColor = buttonInput.bgColor
          entity.activeColor = buttonInput.activeColor

          return entity
        })
      }
    }

    if (input.endPage !== undefined) {
      if (!form.endPage) {
        form.endPage = new PageEntity()
        form.endPage.show = false
      }

      if (input.endPage.show !== undefined) {
        form.endPage.show = input.endPage.show
      }

      if (input.endPage.title !== undefined) {
        form.endPage.title = input.endPage.title
      }

      if (input.endPage.paragraph !== undefined) {
        form.endPage.paragraph = input.endPage.paragraph
      }

      if (input.endPage.buttonText !== undefined) {
        form.endPage.buttonText = input.endPage.buttonText
      }

      if (input.endPage.buttons !== undefined) {
        form.endPage.buttons = input.endPage.buttons.map(buttonInput => {
          const entity = form.endPage?.buttons?.find(value => value.id?.toString() === buttonInput.id) || new PageButtonEntity()
          entity.page = form.endPage
          entity.url = buttonInput.url
          entity.action = buttonInput.action
          entity.text = buttonInput.text
          entity.color = buttonInput.color
          entity.bgColor = buttonInput.bgColor
          entity.activeColor = buttonInput.activeColor

          return entity
        })
      }
    }

    await this.formRepository.save(form)

    return form
  }
}
