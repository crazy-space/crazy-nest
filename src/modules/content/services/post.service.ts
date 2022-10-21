import { NotFoundException, Injectable } from '@nestjs/common'

import { omit } from 'lodash'

import { CreatePostDto, UpdatePostDto } from '../dtos'
import { PostRepository } from '../repositories'

/**
 * 文章服务
 *
 * @export
 * @class PostService
 */
@Injectable()
export class PostService {
  constructor(private postRepository: PostRepository) {}

  /**
   * @description 查询文章列表
   */
  async findList() {
    return this.postRepository.find()
  }

  /**
   * @description 查询一篇文章的详细信息
   * @param {string} id
   */
  async findOne(id: string) {
    return this.postRepository.findOneOrFail({ where: { id } })
  }

  /**
   * @description 添加文章
   * @param {CreatePostDto} data
   */
  async create(data: CreatePostDto) {
    const item = await this.postRepository.save(data)
    return this.findOne(item.id)
  }

  /**
   * @description 更新文章
   * @param {UpdatePostDto} data
   */
  async update(data: UpdatePostDto) {
    await this.postRepository.update(data.id, omit(data, ['id']))
    return this.findOne(data.id)
  }

  /**
   * @description 添加文章
   * @param {string} id
   */
  async delete(id: string) {
    const post = await this.postRepository.findOne({ where: { id } })
    if (!post) throw new NotFoundException(`Post ${id} not exists!`)
    return this.postRepository.remove(post)
  }
}
