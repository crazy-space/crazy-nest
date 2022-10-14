/*
 * @Author: Youzege
 * @Date: 2022-10-14 10:57:22
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 14:34:50
 */
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeeModule } from './coffees/coffees.module'

@Module({
  imports: [CoffeeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
