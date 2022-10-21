import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'

/**
 * 文章模型
 *
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
  @Column({ comment: '文章内容', type: 'text' })
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
}
