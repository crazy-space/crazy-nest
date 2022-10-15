/*
 * @Author: Youzege
 * @Date: 2022-10-14 22:53:44
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-15 22:30:19
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'

import { PaginationQueryDto } from '@/common/pagination-query.dto'

import { CoffeeService } from './coffees.service'
import { CreateCoffeeDto } from './dto/create-coffee.dto'
import { UpdateCoffeeDto } from './dto/update-coffee.dto'

/*
 * @Author: Youzege
 * @Date: 2022-10-14 13:23:14
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 13:53:24
 */
@Controller('coffee')
export class CoffeesController {
  constructor(private readonly coffeeService: CoffeeService) {}

  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeeService.findAll(paginationQuery)
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id)
    return this.coffeeService.findOne(id)
  }

  @Post()
  createCoffee(@Body() body: CreateCoffeeDto) {
    return this.coffeeService.createCoffee(body)
  }

  @Patch(':id')
  updateCoffee(@Param('id') id: number, @Body() body: UpdateCoffeeDto) {
    return this.coffeeService.updateCoffee(id, body)
  }

  @Delete(':id')
  removeCoffee(@Param('id') id: number) {
    return this.coffeeService.removeCoffee(id)
  }
}
