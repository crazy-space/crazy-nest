import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common'

import { CreatePostDto } from './create-post.dto'
import { UpdatePostDto } from './update-post.dto'

export interface PostEntity {
  id: number
  title: string
  summary?: string
  body: string
}

let posts: PostEntity[] = [
  { title: '文章 1', body: '文章内容 1' },
  { title: '文章 2', body: '文章内容 2' },
  { title: '文章 3', body: '文章内容 3' },
  { title: '文章 4', body: '文章内容 4' },
].map((value, id) => ({ ...value, id }))

@Controller('posts')
export class PostController {
  // GET 路由--获取所有文章
  @Get()
  async index() {
    return posts
  }

  // GET 参数路由--根据ID获取文章
  @Get(':id')
  async show(@Param('id', new ParseIntPipe()) id: number) {
    const post = posts.find((item) => item.id === id)
    return post
  }

  // POST 路由--添加文章
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
    const newPost: PostEntity = {
      ...data,
      id: Math.max(...posts.map(({ id }) => id)),
    }
    posts.push(newPost)
    return newPost
  }

  @Patch(':id')
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
    let toUpdate = posts.find((item) => item.id === data.id)
    toUpdate = { ...toUpdate, title: '修改一篇文章的标题' }
    posts = posts.map((item) => (item.id === data.id ? toUpdate : item))
    return toUpdate
  }

  @Delete(':id')
  async delete(@Param('id', new ParseIntPipe()) id: number) {
    console.log(id)
    const toDelete = posts.find((item) => item.id === id)
    posts = posts.filter((item) => item.id !== id)
    return toDelete
  }
}
