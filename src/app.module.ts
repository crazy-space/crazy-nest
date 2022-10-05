import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PostController } from './demo/controllers/post.controller'
import { DemoModule } from './demo/providers/demo.module'

@Module({
  imports: [DemoModule],
  controllers: [AppController, PostController],
  providers: [AppService],
})
export class AppModule {}
