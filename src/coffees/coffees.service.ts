/*
 * @Author: Youzege
 * @Date: 2022-10-14 13:52:11
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-15 22:32:34
 */
import { PaginationQueryDto } from '@/common/pagination-query.dto'
import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'
import { Coffee } from './entities/coffee.entity'
import { Flavor } from './entities/flavors.entity'

@Injectable()
export class CoffeeService {
  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
  ) {}

  async findOne(id: number) {
    const coffee = await this.coffeeRepository.findOne({
      where: { id },
      relations: ['flavors'],
    })
    if (!coffee) {
      // throw new HttpException(`coffee ${id} not found`, HttpStatus.NOT_FOUND)
      throw new NotFoundException(`coffee ${id} not found`)
    }
    return coffee
  }

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery
    return this.coffeeRepository.find({
      relations: ['flavors'],
      skip: offset,
      take: limit,
    })
  }

  async createCoffee(createCoffeeDto: CreateCoffeeDto) {
    const flavors = await Promise.all(
      createCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
    )

    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors,
    })
    return this.coffeeRepository.save(coffee)
  }

  async updateCoffee(id: number, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors =
      updateCoffeeDto.flavors &&
      (await Promise.all(
        updateCoffeeDto.flavors.map((name) => this.preloadFlavorByName(name)),
      ))
    const coffee = await this.coffeeRepository.preload({
      id,
      ...updateCoffeeDto,
      flavors,
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

  private async preloadFlavorByName(name: string): Promise<Flavor> {
    const existingFlavor = await this.flavorRepository.findOne({
      where: { name },
    })
    if (existingFlavor) {
      return existingFlavor
    }
    return this.flavorRepository.create({ name })
  }
}
