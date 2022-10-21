import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

import { CategoryEntity } from './category.entity'
import { CommentEntity } from './comment.entity'

/**
 * @description 文章模型
 * @export
 * @class PostEntity
 * @extends {BaseEntity}
 */
@Entity('content_posts')
export class PostEntity extends BaseEntity {
  /**
   * 文章ID
   *
   * @type {string}
   * @memberof PostEntity
   */
  @PrimaryGeneratedColumn('uuid')
  id!: string

  /**
   * 文章标题
   *
   * @type {string}
   * @memberof PostEntity
   */
  @Column({ comment: '文章标题' })
  title!: string

  /**
   * 文章内容
   *
   * @type {string}
   * @memberof PostEntity
   */
  @Column({ comment: '文章内容', type: 'longtext' })
  body!: string

  /**
   * 文章描述
   *
   * @type {string}
   * @memberof PostEntity
   */
  @Column({ comment: '文章描述', nullable: true })
  summary?: string

  /**
   * 关键字
   *
   * @type {string[]}
   * @memberof PostEntity
   */
  @Column({ comment: '关键字', type: 'simple-array', nullable: true })
  keywords?: string[]

  /**
   * 创建时间
   *
   * @type {Date}
   * @memberof PostEntity
   */
  @CreateDateColumn({
    comment: '创建时间',
  })
  createdAt!: Date

  /**
   * 更新时间
   *
   * @type {Date}
   * @memberof PostEntity
   */
  @UpdateDateColumn({
    comment: '更新时间',
  })
  updatedAt!: Date

  /**
   * @description 与分类多对多关联
   * @type {CategoryEntity[]}
   */
  @ManyToMany((type) => CategoryEntity, (category) => category.posts, {
    // 在新增文章时,如果所属分类不存在则直接创建
    cascade: true,
  })
  @JoinTable()
  categories!: CategoryEntity[]

  /**
   * @description 与评论一对多关联
   * @type {CommentEntity[]}
   */
  @OneToMany((type) => CommentEntity, (comment) => comment.post, {
    cascade: true,
  })
  comments!: CommentEntity[]

  /**
   * @description 统计评论数量
   * @type {number}
   */
  commentCount!: number
}
