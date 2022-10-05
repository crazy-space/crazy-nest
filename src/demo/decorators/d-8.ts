/**
 * 访问器装饰器
 *
 * get set前缀的一些装饰
 */

export const HiddenDecorator = () => {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    descriptor.enumerable = false
  }
}

export const PrefixDecorator = (prefix: string) => {
  return (target: any, propertyName: string, descriptor: PropertyDescriptor) => {
    return {
      ...descriptor,
      set(value: string) {
        descriptor.set.apply(this, [`${prefix}_${value}`])
      },
    }
  }
}

export class UserEntity {
  private _nickname: string

  // @ts-ignore
  private fullname: string

  @HiddenDecorator()
  @PrefixDecorator('youzege')
  get nickname() {
    return this._nickname
  }

  set nickname(value: string) {
    this._nickname = value
    this.fullname = `${value}_fullname`
  }
}

export const D8 = () => {
  const user = new UserEntity()
  user.nickname = 'xdd'
  console.log(user)
  console.log(user.nickname)
  for (const i in user) {
    console.log(i)
  }
}
