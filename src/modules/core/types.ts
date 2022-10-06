/**
 * 一个类的类型
 */
import { SelectQueryBuilder } from 'typeorm'

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
