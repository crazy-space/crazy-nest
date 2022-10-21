/*
 * @Author: Youzege
 * @Date: 2022-10-21 16:42:14
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 16:42:22
 */
import { Injectable } from '@nestjs/common'
import { PartialType } from '@nestjs/swagger'
import { IsDefined, IsUUID } from 'class-validator'

import { CreateCategoryDto } from './create-category.dto'

/**
 * @description 更新分类时的请求数据验证
 * @export
 * @class UpdateCategoryDto
 * @extends {PartialType(CreateCategoryDto)}
 */
@Injectable()
export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
  @IsUUID(undefined, { groups: ['update'], message: '分类ID格式错误' })
  @IsDefined({ groups: ['update'], message: '分类ID必须指定' })
  id!: string
}
