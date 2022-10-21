/*
 * @Author: Youzege
 * @Date: 2022-10-21 17:00:52
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 17:00:54
 */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  ValidationPipe,
} from '@nestjs/common'

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos'

import { CategoryService } from '../services'

/**
 * @description 分类控制器
 * @export
 * @class CategoryController
 */
@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  async index() {
    return this.categoryService.findTrees()
  }

  @Get(':category')
  async show(
    @Param('category', new ParseUUIDPipe())
    category: string,
  ) {
    return this.categoryService.findOne(category)
  }

  @Post()
  async store(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['create'],
      }),
    )
    data: CreateCategoryDto,
  ) {
    return this.categoryService.create(data)
  }

  @Patch()
  async update(
    @Body(
      new ValidationPipe({
        transform: true,
        forbidUnknownValues: true,
        validationError: { target: false },
        groups: ['update'],
      }),
    )
    data: UpdateCategoryDto,
  ) {
    return this.categoryService.update(data)
  }

  @Delete(':category')
  async destroy(
    @Param('category', new ParseUUIDPipe())
    category: string,
  ) {
    return this.categoryService.delete(category)
  }
}
