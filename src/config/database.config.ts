/*
 * @Author: Youzege
 * @Date: 2022-10-21 13:58:03
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 15:12:56
 */
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export const database: () => TypeOrmModuleOptions = () => ({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'pass123',
  database: 'full_stack_mysql',

  entities: [],
  // 自动注册模块
  autoLoadEntities: true,
  // webpack热更新保持连接
  keepConnectionAlive: true,
  // 开发环境 同步entities 数据结构至 数据库
  synchronize: process.env.NODE_ENV !== 'production',
})
