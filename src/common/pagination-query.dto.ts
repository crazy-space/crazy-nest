import { IsOptional, IsPositive } from 'class-validator'

/*
 * @Author: Youzege
 * @Date: 2022-10-15 22:27:52
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-15 22:28:18
 */
export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: number

  @IsOptional()
  @IsPositive()
  offset: number
}
