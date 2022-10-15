import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'

import { Flavor } from './flavors.entity'

/*
 * @Author: Youzege
 * @Date: 2022-10-14 13:55:06
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-15 15:57:03
 */
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  brand: string

  // cascade - auto insert flavor data
  @JoinTable()
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees, { cascade: true })
  flavors: Flavor[]
}
