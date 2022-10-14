import { TypeOrmModule } from '@nestjs/typeorm'
import { Module } from '@nestjs/common'

import { CoffeesController } from './coffees.controller'
import { CoffeeService } from './coffees.service'
import { Coffee } from './entities/coffee.entity'

/*
 * @Author: Youzege
 * @Date: 2022-10-14 14:33:45
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 23:46:35
 */
@Module({
  imports: [TypeOrmModule.forFeature([Coffee])],
  controllers: [CoffeesController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
