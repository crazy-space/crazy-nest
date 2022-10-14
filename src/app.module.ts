/*
 * @Author: Youzege
 * @Date: 2022-10-14 22:53:44
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 23:27:27
 */
import { Module } from '@nestjs/common'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { CoffeeModule } from './coffees/coffees.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    CoffeeModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'pass123',
      database: 'postgres',
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
