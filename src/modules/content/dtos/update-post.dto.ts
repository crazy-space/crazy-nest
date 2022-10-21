import { Injectable } from '@nestjs/common'
import { PartialType } from '@nestjs/swagger'
import { IsUUID, IsDefined } from 'class-validator'

import { CreatePostDto } from './create-post.dto'

/*
 * @Author: Youzege
 * @Date: 2022-10-21 14:43:52
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 14:43:59
 */
@Injectable()
export class UpdatePostDto extends PartialType(CreatePostDto) {
  @IsUUID(undefined, { groups: ['update'], message: '文章ID格式错误' })
  @IsDefined({ groups: ['update'], message: '文章ID必须指定' })
  id!: string
}
