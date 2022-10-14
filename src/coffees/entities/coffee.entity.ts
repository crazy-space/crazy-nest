import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

/*
 * @Author: Youzege
 * @Date: 2022-10-14 13:55:06
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-14 23:39:40
 */
@Entity()
export class Coffee {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  brand: string

  @Column('json', { nullable: true })
  flavors: string[]
}
