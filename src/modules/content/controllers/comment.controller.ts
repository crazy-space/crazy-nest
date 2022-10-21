/*
 * @Author: Youzege
 * @Date: 2022-10-21 17:01:54
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 17:01:56
 */
import {
  Get,
  Body,
  Controller,
  Delete,
  Param,
  ParseUUIDPipe,
  Post,
  ValidationPipe,
  SerializeOptions,
} from '@nestjs/common'

import { OptionalUUIDPipe } from '@/modules/core/pipes'

import { CreateCommentDto } from '../dtos'
import { CommentService } from '../services'

/**
 * 评论控制器
 *
 * @export
 * @class CommentController
 */
@Controller('comments')
export class CommentController {
  constructor(protected commentService: CommentService) {}

  /**
   * @description 显示评论树
   */
  @Get(':post?')
  @SerializeOptions({})
  async index(
    @Param('post', new OptionalUUIDPipe())
    post?: string,
  ) {
    return this.commentService.find(post)
  }

  @Post()
  async store(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        validationError: { target: false },
      }),
    )
    data: CreateCommentDto,
  ) {
    return this.commentService.create(data)
  }

  @Delete(':comment')
  async destroy(
    @Param('comment', new ParseUUIDPipe())
    comment: string,
  ) {
    return this.commentService.delete(comment)
  }
}
