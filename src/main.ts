/*
 * @Author: Youzege
 * @Date: 2022-10-14 10:57:22
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-15 22:29:20
 */
import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify'
import { useContainer } from 'class-validator'

import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  )
  // 前缀: 指定url前缀
  app.setGlobalPrefix('api')
  // 自定义约束-注入依赖
  useContainer(app.select(AppModule), { fallbackOnErrors: true })

  // 验证管道
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  )

  await app.listen(3000, '0.0.0.0')

  console.log('server: http://localhost:3000/api')
}
bootstrap()
