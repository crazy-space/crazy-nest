/*
 * @Author: Youzege
 * @Date: 2022-10-21 14:38:34
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 15:02:27
 */
import { Repository } from 'typeorm'

import { CustomRepository } from '@/modules/core/decorators'

import { PostEntity } from '../entities/post.entity'

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  buildBaseQuery() {
    throw new Error('Method not implemented.')
  }
}
