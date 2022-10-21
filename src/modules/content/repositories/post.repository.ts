import { Repository } from 'typeorm'

import { CustomRepository } from '@/modules/core/decorators'

import { CommentEntity } from '../entities/comment.entity'
import { PostEntity } from '../entities/post.entity'

@CustomRepository(PostEntity)
export class PostRepository extends Repository<PostEntity> {
  buildBaseQuery() {
    // 在查询之前先查询出评论数量在添加到commentCount字段上
    return this.createQueryBuilder('post')
      .leftJoinAndSelect('post.categories', 'categories')
      .addSelect((subQuery) => {
        return subQuery
          .from(CommentEntity, 'c')
          .select('COUNT(c.id)', 'count')
          .where('c.post.id = post.id')
      }, 'commentCount')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
  }
}
