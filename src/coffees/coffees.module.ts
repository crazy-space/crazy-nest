import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { CoffeesController } from './coffees.controller'
import { CoffeeService } from './coffees.service'
import { Coffee } from './entities/coffee.entity'
import { Flavor } from './entities/flavors.entity'

/*
 * @Author: Youzege
 * @Date: 2022-10-14 14:33:45
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-15 10:56:13
 */
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor])],
  controllers: [CoffeesController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
