import { DynamicModule, ModuleMetadata, Provider, Type } from '@nestjs/common'

import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm'
import { DataSource, ObjectType } from 'typeorm'

import { CUSTOM_REPOSITORY_METADATA } from './constants'

import { CoreOptions } from './types'

/*
 * @Author: Youzege
 * @Date: 2022-10-21 14:01:58
 * @LastEditors: Youzege
 * @LastEditTime: 2022-10-21 14:14:31
 */
export class CoreModule {
  /**
   * 注册 core 模块
   * @param options
   */
  public static forRoot(options: CoreOptions = {}): DynamicModule {
    const imports: ModuleMetadata['imports'] = []

    if (options.database) imports.push(TypeOrmModule.forRoot(options.database))

    return {
      global: true,
      imports,
      module: CoreModule,
    }
  }

  /**
   * @description 注册自定义Repository
   * @static
   * @template T
   * @param {T[]} repository 需要注册的自定义类 列表
   * @param {string} [dataSourceName] 数据池名称，默认 连接
   */
  public static forRepository<T extends Type<any>>(
    repositorys: T[],
    dataSouceName?: string,
  ): DynamicModule {
    const providers: Provider[] = []

    for (const Repo of repositorys) {
      const entity = Reflect.getMetadata(CUSTOM_REPOSITORY_METADATA, Repo)

      if (!entity) {
        continue
      }

      providers.push({
        inject: [getDataSourceToken(dataSouceName)],
        provide: Repo,
        useFactory: (dataSouce: DataSource): typeof Repo => {
          const base = dataSouce.getRepository<ObjectType<any>>(entity)
          return new Repo(base.target, base.manager, base.queryRunner)
        },
      })
    }

    return {
      exports: providers,
      module: CoreModule,
      providers,
    }
  }
}
