/**
 * d-3.ts 装饰器工厂 的其他用法
 * 对class的原型链 property 上的属性|方法和class本身的静态属性|方法
 * 进行赋值或者重载操作，还可以重载构造函数
 *
 * 1.获取target(源class)
 *  - Original = target，对Original的原型链上添加新属性
 *
 * 2.构造函数重载
 *  -创建一个函数 constructor，函数最终返回一个class
 *  -参数: ...args 各种要添加到原型链上的属性|方法
 *  -return new Original(...args)
 *  -操作:
 *   - constructor.prototype = Original.prototype 进行原型链进行赋值
 *   - constructor.xxx = xxx 添加静态属性
 *
 * 3.静态属性无法通过[key: string] = any添加，需要通过接口来动态添加静态属性
 *  - set Interface { xxx(要设置的静态属性): type }
 *  - (ProfileService as unknown as StaticUser).myInfo 进行类型断言
 */

type UserProfile = Record<string, any> & {
  phone?: number
  address?: string
}

const ProfileDecorator = (profile: UserProfile) => (target: any) => {
  const Original = target
  let userInfo = ''

  Object.keys(profile).forEach((key) => {
    userInfo = `${userInfo}.${profile[key].toString()}`
  })

  // 新增一个原型属性
  Original.prototype.userInfo = userInfo

  // 使用函数创建一个新的class，返回值为传入class的对象，完成构造函数重载
  function constructor(...args: any) {
    console.log('constructor has been changed')

    return new Original(...args)
  }

  // 对原型链进行赋值操作
  constructor.prototype = Original.prototype

  // 新增一个静态属性
  constructor.myInfo = `myInfo ${userInfo}~`
  return constructor as typeof Original
}

class UserService {
  getName() {}
}

interface StaticUser {
  new (): UserService
  myInfo: string
}

@ProfileDecorator({ phone: 122, address: 'youzege' })
class ProfileService {}

export const D4 = () => {
  const profile = new ProfileService()
  // profile 实例化 的 属性
  console.log((profile as any).userInfo)
  // ProfileService 类上的 静态属性
  console.log((ProfileService as unknown as StaticUser).myInfo)
}
