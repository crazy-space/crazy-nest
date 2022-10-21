/*
 * @Author: Youzege
 * @Date: 2022-10-21 16:35:15
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 16:35:24
 */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm'

import { PostEntity } from './post.entity'

/**
 * @description 树形嵌套评论
 * @export
 * @class CommentEntity
 * @extends {BaseEntity}
 */
@Tree('materialized-path')
@Entity('content_comments')
export class CommentEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ comment: '评论内容', type: 'longtext' })
  body!: string

  /**
   * @description 评论与分类多对一
   * @type {PostEntity}
   */
  @ManyToOne((type) => PostEntity, (post) => post.comments, {
    // 文章不能为空
    nullable: false,
    // 跟随父表删除与更新
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  post!: PostEntity

  /**
   * @description 子评论
   * @type {CommentEntity[]}
   */
  @TreeChildren({ cascade: true })
  children!: CommentEntity[]

  /**
   * @description 父评论
   * @type {(CommentEntity | null)}
   */
  @TreeParent({ onDelete: 'CASCADE' })
  parent?: CommentEntity | null
}
