/*
 * @Author: Youzege
 * @Date: 2022-10-21 14:32:47
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 15:00:16
 */

import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CoreModule } from '../core/core.module'

import { PostController } from './controllers/post.controller'

import { CreatePostDto } from './dtos/create-post.dto'
import { UpdatePostDto } from './dtos/update-post.dto'

import { PostEntity } from './entities/post.entity'
import { PostRepository } from './repositories/post.repository'
import { PostService } from './services/post.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    // 注册自定义Repository
    CoreModule.forRepository([PostRepository]),
  ],
  providers: [PostService, CreatePostDto, UpdatePostDto],
  controllers: [PostController],
  exports: [
    // 导出自定义Repository,以供其它模块使用
    CoreModule.forRepository([PostRepository]),
  ],
})
export class ContentModule {}
