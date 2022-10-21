/*
 * @Author: Youzege
 * @Date: 2022-10-21 16:45:55
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 16:46:41
 */
import { Injectable, NotFoundException } from '@nestjs/common'
import { isNil, unset } from 'lodash'

import { CreateCommentDto } from '../dtos'

import { CommentEntity } from '../entities'
import { PostRepository } from '../repositories'
import { CommentRepository } from '../repositories/comment.repository'

/**
 * @description 评论服务
 * @export
 * @class CommentService
 */
@Injectable()
export class CommentService {
  constructor(
    protected commentRepository: CommentRepository,
    protected postRepository: PostRepository,
  ) {}

  /**
   * @description 查找一篇文章的评论
   * @param {string} [post]
   */
  async find(post?: string) {
    const data = (
      await this.commentRepository.findRoots({ relations: ['post'] })
    ).filter((c) => (!isNil(post) ? c.post.id === post : true))
    const comments: CommentEntity[] = []
    for (let i = 0; i < data.length; i++) {
      const c = data[i]
      unset(c, 'post')
      comments.push(await this.commentRepository.findDescendantsTree(c))
    }
    return comments
  }

  /**
   * @description 新增评论
   * @param {CreateCommentDto} data
   */
  async create(data: CreateCommentDto) {
    const item = await this.commentRepository.save({
      ...data,
      parent: await this.getParent(data.parent),
      post: await this.getPost(data.post),
    })
    return this.commentRepository.findOneOrFail({ where: { id: item.id } })
  }

  /**
   * @description 删除评论
   * @param {string} id
   */
  async delete(id: string) {
    const comment = await this.commentRepository.findOne({ where: { id } })
    if (!comment) throw new NotFoundException(`Comment ${id} not found`)
    return this.commentRepository.remove(comment)
  }

  /**
   * @description 获取评论所属文章实例
   * @protected
   * @param {string} id
   */
  protected async getPost(id: string) {
    const post = await this.postRepository.findOne({ where: { id } })
    if (!post) {
      throw new NotFoundException(
        `The post ${id} which comment belongs not exists!`,
      )
    }
    return post
  }

  /**
   * @description 获取请求传入的父评论
   * @protected
   * @param {string} [id]
   */
  protected async getParent(id?: string) {
    let parent: CommentEntity | undefined
    if (id !== undefined) {
      if (id === null) return null
      parent = await this.commentRepository.findOne({ where: { id } })
      if (!parent) {
        throw new NotFoundException(`Parent comment ${id} not exists!`)
      }
    }
    return parent
  }
}
