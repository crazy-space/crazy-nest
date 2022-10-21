/*
 * @Author: Youzege
 * @Date: 2022-10-21 16:39:27
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 16:39:31
 */
import { TreeRepository } from 'typeorm'

import { CustomRepository } from '@/modules/core/decorators'

import { CommentEntity } from '../entities'

@CustomRepository(CommentEntity)
export class CommentRepository extends TreeRepository<CommentEntity> {}
