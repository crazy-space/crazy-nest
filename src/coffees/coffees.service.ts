import { CreateCoffeeDto } from './dto/create-coffee.dto'
/*
 * @Author: Youzege
 * @Date: 2022-10-14 13:52:11
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-15 00:21:44
 */
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { Coffee } from './entities/coffee.entity'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
  ) {}

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOneBy({ id })
    if (!coffee) {
      // throw new HttpException(`coffee ${id} not found`, HttpStatus.NOT_FOUND)
      throw new NotFoundException(`coffee ${id} not found`)
    }
    return coffee
  }

  findAll() {
    return this.coffeeRepository.find()
  }

  createCoffee(createCoffeeDto: CreateCoffeeDto) {
    const coffee = this.coffeeRepository.create(createCoffeeDto)
    return this.coffeeRepository.save(coffee)
  }

  async updateCoffee(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
    })
    if (!coffee) {
      throw new NotFoundException(`Coffee ${id} not found`)
    }
    return this.coffeeRepository.save(coffee)
  }

  async removeCoffee(id: number) {
    const coffee = await this.findOne(id)

    return this.coffeeRepository.remove(coffee)
  }
}
