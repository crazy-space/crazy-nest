import { Injectable } from '@nestjs/common'
import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

@Injectable()
export class CreatePostDto {
  @MaxLength(255, {
    always: true,
    message: '标题最大长度为255',
  })
  @IsNotEmpty({ groups: ['create'], message: '文章标题是必填项' })
  @IsOptional({ groups: ['update'] })
  title!: string

  @IsNotEmpty({ groups: ['create'], message: '文章内容是必填项' })
  @IsOptional({ groups: ['update'] })
  body!: string

  @MaxLength(500, {
    always: true,
    message: '摘要描述最长为500字符',
  })
  @IsOptional({ always: true })
  summary?: string
}
