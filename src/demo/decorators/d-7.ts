/**
 * 参数装饰器
 * 配合类或者方法装饰器组合使用
 *
 * 参数
 * target key
 * index: 参数数组中的位置索引
 * 格式化一个方法的参数
 *
 * 1.在(参数)里面使用装饰器
 *  -装饰器会获得传入的参数,将函数保存到一个数组中保存
 * 2.方法装饰器执行
 *  -对数据格式化，函数重载，在实际执行前完成格式化。
 */

const parseConf: ((...args: any[]) => any)[] = []

export const parse =
  (parseTo: (...args: any[]) => any) => (target: any, propertyName: string, index: number) => {
    parseConf[index] = parseTo
  }

export const parseDecorator = (
  targer: any,
  propertyName: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor => {
  console.log('开始格式化数据')
  return {
    ...descriptor,
    value(...args: any[]) {
      const newArgs = args.map((value, index) => {
        return parseConf[index] ? parseConf[index](value) : value
      })
      console.log('格式化完成')
      return descriptor.value.apply(this, newArgs)
    },
  }
}

export interface UserType {
  id: number
  username: string
}

class UserService {
  private users: UserType[] = [
    { id: 1, username: 'youzege' },
    { id: 2, username: 'xdd' },
  ]

  getUsers() {
    return this.users
  }

  @parseDecorator
  delete(@parse((arg: any) => Number(arg)) id: number) {
    this.users = this.users.filter((userObj) => userObj.id !== id)
  }
}

export const D7 = () => {
  const userService = new UserService()
  userService.delete(1)
  console.log(userService.getUsers())
}
