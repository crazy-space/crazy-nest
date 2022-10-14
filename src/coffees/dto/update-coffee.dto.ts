import { PartialType } from '@nestjs/mapped-types'

import { CreateCoffeeDto } from './create-coffee.dto'

/*
 * @Author: Youzege
 * @Date: 2022-10-14 14:46:15
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 16:03:15
 */
export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {}
