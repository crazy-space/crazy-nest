/*
 * @Author: Youzege
 * @Date: 2022-10-21 16:41:59
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 16:42:26
 */
import { Injectable } from '@nestjs/common'
import { Transform } from 'class-transformer'
import {
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  ValidateIf,
} from 'class-validator'

/**
 * @description 新增分类时的请求数据验证
 * @export
 * @class CreateCategoryDto
 */
@Injectable()
export class CreateCategoryDto {
  @MaxLength(25, {
    always: true,
    message: '分类名称长度不得超过$constraint1',
  })
  @IsNotEmpty({ groups: ['create'], message: '分类名称不得为空' })
  @IsOptional({ groups: ['update'] })
  name!: string

  @IsUUID(undefined, { always: true, message: '父分类ID格式不正确' })
  @ValidateIf((value) => value.parent !== null && value.parent)
  @IsOptional({ always: true })
  @Transform(({ value }) => (value === 'null' ? null : value))
  parent?: string
}
