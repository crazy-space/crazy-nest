import { NotFoundException, Injectable } from '@nestjs/common'

import { omit } from 'lodash'

import { In } from 'typeorm'

import { QueryHook } from '@/modules/core/types'

import { CreatePostDto, UpdatePostDto } from '../dtos'
import { PostEntity } from '../entities'
import { CategoryRepository, PostRepository } from '../repositories'

/**
 * 文章服务
 *
 * @export
 * @class PostService
 */
@Injectable()
export class PostService {
  constructor(
    private postRepository: PostRepository,
    private categoryRepository: CategoryRepository,
  ) {}

  /**
   * @description 查询文章列表
   */
  async findList() {
    return (await this.getItemQuery()).getMany()
  }

  /**
   * @description 查询一篇文章的详细信息
   * @param {string} id
   */
  async findOne(id: string) {
    const query = await this.getItemQuery()
    const item = await query.where('post.id = :id', { id }).getOne()
    if (!item) throw new NotFoundException(`Post ${id} not exists!`)
    return item
  }

  /**
   * @description 添加文章
   * @param {CreatePostDto} data
   */
  async create(data: CreatePostDto) {
    const createPostDto = {
      ...data,
      // 文章所属分类
      categories: data.categories
        ? await this.categoryRepository.findBy({
            id: In(data.categories),
          })
        : [],
    }
    const item = await this.postRepository.save(createPostDto)
    return this.findOne(item.id)
  }

  /**
   * @description 更新文章
   * @param {UpdatePostDto} data
   */
  async update(data: UpdatePostDto) {
    const post = await this.findOne(data.id)
    if (data.categories) {
      // 更新文章所属分类
      await this.postRepository
        .createQueryBuilder('post')
        .relation(PostEntity, 'categories')
        .of(post)
        .addAndRemove(data.categories ?? [], post.categories ?? [])
    }
    await this.postRepository.update(data.id, omit(data, ['id', 'categories']))
    return this.findOne(data.id)
  }

  /**
   * @description 删除文章
   * @param {string} id
   */
  async delete(id: string) {
    const post = await this.postRepository.findOne({ where: { id } })
    if (!post) throw new NotFoundException(`Post ${id} not exists!`)
    return this.postRepository.remove(post)
  }

  /**
   * @description 使用自定义Repository构建基础查询
   * @protected
   * @param {QueryHook<PostEntity>} [callback]
   */
  protected async getItemQuery(callback?: QueryHook<PostEntity>) {
    let query = this.postRepository.buildBaseQuery()
    if (callback) query = await callback(query)
    return query
  }
}
