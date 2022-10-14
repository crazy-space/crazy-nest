import { Module } from '@nestjs/common'

import { CoffeesController } from './coffees.controller'
import { CoffeeService } from './coffees.service'

/*
 * @Author: Youzege
 * @Date: 2022-10-14 14:33:45
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 14:33:58
 */
@Module({
  controllers: [CoffeesController],
  providers: [CoffeeService],
})
export class CoffeeModule {}
