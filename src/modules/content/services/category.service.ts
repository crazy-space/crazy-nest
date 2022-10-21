import { Injectable, NotFoundException } from '@nestjs/common'
import { isNil, omit } from 'lodash'
import { EntityManager } from 'typeorm'

import { CreateCategoryDto, UpdateCategoryDto } from '../dtos'
import { CategoryEntity } from '../entities'

import { CategoryRepository } from '../repositories/category.repository'

/**
 * @description 分类服务
 * @export
 * @class CategoryService
 */
@Injectable()
export class CategoryService {
  constructor(
    protected entityManager: EntityManager,
    protected categoryRepository: CategoryRepository,
  ) {}

  /**
   * @description 查询分类树
   */
  async findTrees() {
    return this.categoryRepository.findTrees()
  }

  /**
   * @description 查询一个分类并暴露其父分类
   * @param {string} id
   */
  async findOne(id: string) {
    return this.categoryRepository.findOneOrFail({
      where: { id },
      relations: ['parent'],
    })
  }

  /**
   * @description 新增分类
   * @param {CreateCategoryDto} data
   */
  async create(data: CreateCategoryDto) {
    const item = await this.categoryRepository.save({
      ...data,
      parent: await this.getParent(data.parent),
    })
    return this.findOne(item.id)
  }

  /**
   * @description 更新分类
   * @param {UpdateCategoryDto} data
   */
  async update(data: UpdateCategoryDto) {
    const parent = await this.getParent(data.parent)
    const querySet = omit(data, ['id', 'parent'])
    if (Object.keys(querySet).length > 0) {
      await this.categoryRepository.update(data.id, querySet)
    }
    const cat = await this.findOne(data.id)
    const shouldUpdateParent =
      (!isNil(cat.parent) && !isNil(parent) && cat.parent.id !== parent.id) ||
      (isNil(cat.parent) && !isNil(parent)) ||
      (!isNil(cat.parent) && isNil(parent))
    // 父分类单独更新
    if (parent !== undefined && shouldUpdateParent) {
      cat.parent = parent
      await this.entityManager.save(cat)
    }
    return cat
  }

  /**
   * @description 删除分类
   * @param {string} id
   */
  async delete(id: string) {
    const category = await this.categoryRepository.findOne({ where: { id } })
    if (!category) {
      throw new NotFoundException(`Category ${id} not exists!`)
    }
    await this.categoryRepository.remove(category)
    return category
  }

  /**
   * @description 获取请求传入的父分类
   * @protected
   * @param {string} [id]
   */
  protected async getParent(id?: string) {
    let parent: CategoryEntity | undefined
    if (id !== undefined) {
      if (id === null) return null
      parent = await this.categoryRepository.findOne({ where: { id } })
      if (!parent)
        throw new NotFoundException(`Parent category ${id} not exists!`)
    }
    return parent
  }
}
