/*
 * @Author: Youzege
 * @Date: 2022-10-15 10:42:53
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-15 15:57:11
 */

import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

import { Coffee } from './coffee.entity'

@Entity()
export class Flavor {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @ManyToMany((type) => Coffee, (coffee) => coffee.flavors)
  coffees: Coffee[]
}
