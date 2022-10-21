/*
 * @Author: Youzege
 * @Date: 2022-10-21 16:33:29
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 16:33:40
 */
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm'

import { PostEntity } from './post.entity'

/**
 * @description 树形嵌套分类
 * @export
 * @class CategoryEntity
 * @extends {BaseEntity}
 */
@Tree('materialized-path')
@Entity('content_categories')
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Column({ comment: '分类名称' })
  name!: string

  @ManyToMany((type) => PostEntity, (post) => post.categories)
  posts!: PostEntity[]

  @TreeChildren({ cascade: true })
  children!: CategoryEntity[]

  /**
   * @description 当删除父分类时,子分类变成顶级分类
   * @type {(CategoryEntity | null)}
   */
  @TreeParent({ onDelete: 'SET NULL' })
  parent!: CategoryEntity | null
}
