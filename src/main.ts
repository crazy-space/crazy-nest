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

  await app.listen(3000, '0.0.0.0')

  console.log('server: http://localhost:3000/api')
}
bootstrap()
