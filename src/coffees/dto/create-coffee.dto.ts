import { IsString } from 'class-validator'

/*
 * @Author: Youzege
 * @Date: 2022-10-14 14:41:24
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 15:37:09
 */
export class CreateCoffeeDto {
  @IsString()
  readonly name: string

  @IsString()
  readonly brand: string

  @IsString({ each: true })
  readonly flavors: string[]
}
