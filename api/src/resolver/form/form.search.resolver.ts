import { Args, Context, Query, Resolver } from '@nestjs/graphql'
import { GraphQLInt } from 'graphql'
import { Roles } from '../../decorator/roles.decorator'
import { User } from '../../decorator/user.decorator'
import { FormModel } from '../../dto/form/form.model'
import { FormPagerModel } from '../../dto/form/form.pager.model'
import { FormEntity } from '../../entity/form.entity'
import { UserEntity } from '../../entity/user.entity'
import { FormService } from '../../service/form/form.service'
import { ContextCache } from '../context.cache'

@Resolver(() => FormPagerModel)
export class FormSearchResolver {
  constructor(
    private readonly formService: FormService,
  ) {
  }

  @Query(() => FormPagerModel)
  @Roles('user')
  async listForms(
    @User() user: UserEntity,
    @Args('start', {type: () => GraphQLInt, defaultValue: 0, nullable: true}) start: number,
    @Args('limit', {type: () => GraphQLInt, defaultValue: 50, nullable: true}) limit: number,
    @Context('cache') cache: ContextCache,
  ): Promise<FormPagerModel> {
    const [forms, total] = await this.formService.find(
      start,
      limit,
      {},
      user.roles.includes('superuser') ? null : user,
    )

    forms.forEach(form => cache.add(cache.getCacheKey(FormEntity.name, form.id), form))

    return new FormPagerModel(
      forms.map(form => new FormModel(form)),
      total,
      limit,
      start,
    )
  }
}
