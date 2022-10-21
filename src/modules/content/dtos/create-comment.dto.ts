/*
 * @Author: Youzege
 * @Date: 2022-10-21 16:42:05
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 16:42:24
 */
import { Injectable } from '@nestjs/common'
import { Transform } from 'class-transformer'
import {
  IsDefined,
  IsNotEmpty,
  IsOptional,
  IsUUID,
  MaxLength,
  ValidateIf,
} from 'class-validator'

/**
 * @description 新增评论时的请求数据验证
 * @export
 * @class CreateCommentDto
 */
@Injectable()
export class CreateCommentDto {
  @MaxLength(1000, { message: '评论内容不得超过$constraint1个字' })
  @IsNotEmpty({ message: '评论的内容不能为空' })
  body!: string

  @IsUUID(undefined, { message: '所属文章的ID格式错误' })
  @IsDefined({ message: '评论所属的文章ID必须指定' })
  post!: string

  @IsUUID(undefined, { message: '父分类ID格式不正确' })
  @ValidateIf((p) => p.parent !== null && p.parent)
  @IsOptional()
  @Transform(({ value }) => (value === 'null' ? null : value))
  parent?: string
}
