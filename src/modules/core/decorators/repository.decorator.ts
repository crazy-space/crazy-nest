import { SetMetadata } from '@nestjs/common'
import { ObjectType } from 'typeorm'

import { CUSTOM_REPOSITORY_METADATA } from '../constants'
/*
 * @Author: Youzege
 * @Date: 2022-10-21 14:28:56
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 14:31:54
 */
// 传入装饰器的metadata数据标识
export const CustomRepository = <T>(entity: ObjectType<T>): ClassDecorator =>
  SetMetadata(CUSTOM_REPOSITORY_METADATA, entity)
