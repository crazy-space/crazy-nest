/*
 * @Author: Youzege
 * @Date: 2022-10-14 13:52:11
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 16:14:40
 */
import { Injectable, NotFoundException } from '@nestjs/common'

import { CoffeeEntity } from './entities/coffee.entity'

@Injectable()
export class CoffeeService {
  private coffees: CoffeeEntity[] = [
    {
      id: 1,
      name: '瑞幸',
      brand: 'xxx1',
      flavors: ['好喝', '便宜'],
    },
    {
      id: 2,
      name: 'xbc',
      brand: 'xxx2',
      flavors: ['不喝', '不买'],
    },
  ]

  findOne(id: number) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    // throw 'a random error'

    const coffee = this.coffees.find((item) => item.id === id)
    if (!coffee) {
      // throw new HttpException(`coffee ${id} not found`, HttpStatus.NOT_FOUND)
      throw new NotFoundException(`coffee ${id} not found`)
    }
    return coffee
  }

  findAll() {
    return this.coffees
  }

  createCoffee(coffee: any) {
    coffee.id = this.coffees.length + 1
    this.coffees.push(coffee)
  }

  updateCoffee(id: number, updateCoffeeDto: any) {
    const exsitingCoffee = this.findOne(id)
    return { exsitingCoffee, updateCoffeeDto }
  }

  removeCoffee(id: number) {
    const coffeeIndex = this.coffees.findIndex((coffee) => coffee.id === id)
    coffeeIndex >= 0 ? this.coffees.splice(coffeeIndex, 1) : null
    return this.coffees
  }
}
