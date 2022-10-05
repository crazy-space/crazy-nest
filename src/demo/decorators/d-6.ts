/**
 * 方法装饰器
 *
 * 接受三个参数
 * target propertyName
 * 主要是 propertyDescriptor
 * - configurable?: boolean; // 能否使用delete、能否修改方法特性或修改访问器属性
 * - enumerable?: boolean;  是否在遍历对象的时候存在
 * - value?: any;  用于定义新的方法代替旧方法
 * - writable?: boolean; 是否可写
 * - get?(): any; // 访问器
 * - set?(v: any): void; // 访问器
 */

const loggerDecorator = () => {
  return function logMethod(
    target: any,
    propertyName: string,
    propertyDescriptor: PropertyDescriptor,
  ): PropertyDescriptor {
    const method = propertyDescriptor.value

    propertyDescriptor.value = function async(...args: any[]) {
      try {
        return method.apply(this, args)
      } finally {
        const now = new Date().valueOf()
        console.log(`lasted logged in ${now}`)
      }
    }
    return propertyDescriptor
  }
}

class UserService {
  @loggerDecorator()
  async login() {
    console.log('login success')
    await new Promise((resolve) => {
      setTimeout(resolve, 100)
    })
  }
}

export const D6 = () => {
  const user = new UserService()
  user.login()
}
