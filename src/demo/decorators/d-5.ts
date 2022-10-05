/**
 * 属性装饰器
 *
 * 属性装饰器一般不单独使用，主要用于配合类或方法装饰器进行组合装饰
 *
 * 参数
 *  - target 当前对象的原型
 *  - propertyKey 属性名称
 */

const userRoles: string[] = []

const RoleDecorator = (roles: string[]) => (target: any, key: string) => {
  roles.forEach((role) => userRoles.push(role))
}

const SetRoleDecorator = <
  T extends new (...args: any[]) => {
    [key: string]: any
  },
>(
  constructor: T,
) => {
  const roles = [
    { name: 'root', desc: '超级管理员' },
    { name: 'admin', desc: '管理员' },
    { name: 'user', desc: '用户' },
  ]
  return class extends constructor {
    constructor(...args: any) {
      super(...args)
      this.roles = roles.filter((role) => userRoles.includes(role.name))
    }
  }
}

@SetRoleDecorator
class UserEntity {
  @RoleDecorator(['admin', 'user'])
  roles: string[] = []
}

export const D5 = () => {
  const userA = new UserEntity()
  console.log(userA.roles)
}
