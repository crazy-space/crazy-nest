/**
 * 高阶函数
 * 柯里化解构登录与记录日志
 *
 * 类装饰器实现思路
 */

type DecoratorFun = (target: any, key: string, description: PropertyDescriptor) => void

// 模拟装饰器---工厂函数
const createDecorator = (decorator: DecoratorFun) => (Model: any, key: string) => {
  // 使用装饰器的Class的原型
  const target = Model.prototype
  // 获取原型的方法描述
  const descriptor = Object.getOwnPropertyDescriptor(target, key)
  // 更改描述，生成新方法
  decorator(target, key, descriptor)
}

const logger: DecoratorFun = (target, key, descriptor) => {
  //
  Object.defineProperty(target, key, {
    ...descriptor,
    value: async (...args: any[]) => {
      try {
        return descriptor.value.apply(this, args)
      } finally {
        const now = new Date().valueOf()
        console.log(`lasted logged in ${now}`)
      }
    },
  })
}

class User {
  async login() {
    console.log('login success')
    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
  }
}

export const D1 = () => {
  // 注册 日志 装饰器 ----> logger
  console.log('---------- 1 注册 日志 装饰器 ----------')
  const loggerDecorator = createDecorator(logger)
  console.log('---------- 2 对 User 类中的方法 进行修饰 ----------')
  loggerDecorator(User, 'login')
  console.log('---------- 3 实例化 User -> user ----------')
  const user = new User()
  console.log('---------- 4 执行 login方法 ----------')
  user.login()
}
