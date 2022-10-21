/*
 * @Author: Youzege
 * @Date: 2022-10-21 16:38:59
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 16:39:07
 */
import { TreeRepository } from 'typeorm'

import { CustomRepository } from '@/modules/core/decorators'

import { CategoryEntity } from '../entities/category.entity'

@CustomRepository(CategoryEntity)
export class CategoryRepository extends TreeRepository<CategoryEntity> {}
