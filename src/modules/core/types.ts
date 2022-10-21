/*
 * @Author: Youzege
 * @Date: 2022-10-21 13:42:54
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 14:05:22
 */
/**
 * 一个类的类型
 */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { SelectQueryBuilder } from 'typeorm'

export type ClassType<T> = { new (...args: any[]): T }
export interface CoreOptions {
  database?: TypeOrmModuleOptions
}

/** ****************************** 数据请求 **************************** */
/**
 * 分页验证DTO接口
 *
 * @export
 * @interface PaginateDto
 */
export interface PaginateDto {
  page: number
  limit: number
}

/** ****************************** 数据操作 **************************** */

/**
 * 为query添加查询的回调函数接口
 */
export type QueryHook<Entity> = (
  hookQuery: SelectQueryBuilder<Entity>,
) => Promise<SelectQueryBuilder<Entity>>
