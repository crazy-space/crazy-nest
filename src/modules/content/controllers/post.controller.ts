/*
 * @Author: Youzege
 * @Date: 2022-10-21 14:48:14
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 14:48:15
 */

import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Body,
  ValidationPipe,
  Patch,
  Delete,
} from '@nestjs/common'

import { CreatePostDto } from '../dtos/create-post.dto'
import { UpdatePostDto } from '../dtos/update-post.dto'
import { PostService } from '../services/post.service'

/**
 * 文章控制器
 *
 * @export
 * @class PostController
 */
@Controller('posts')
export class PostController {
  constructor(protected postService: PostService) {}

  /**
   * @description 查询文章列表
   */
  @Get()
  async index() {
    return this.postService.findList()
  }

  /**
   * 查询一篇文章
   * @param post 文章ID
   */
  @Get(':post')
  async show(@Param('post', new ParseUUIDPipe()) post: string) {
    return this.postService.findOne(post)
  }

  @Post()
  async store(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['create'],
      }),
    )
    data: CreatePostDto,
  ) {
    return this.postService.create(data)
  }

  /**
   * @description 更新文章
   * @param {UpdatePostDto} data 文章数据
   */
  @Patch()
  async update(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['update'],
      }),
    )
    data: UpdatePostDto,
  ) {
    return this.postService.update(data)
  }

  /**
   * @description 删除文章
   * @param {string} post 文章ID
   */
  @Delete(':post')
  async destroy(
    @Param('post', new ParseUUIDPipe())
    post: string,
  ) {
    return this.postService.delete(post)
  }
}
