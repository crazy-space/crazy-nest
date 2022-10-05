/**
 * 参数装饰器实现思路
 *
 * 通过将类本身传入装饰器注解中，对类或类的原型进行处理
 *
 * 类装饰器
 * 实现一个Hello装饰器，可以对类注入一个方法，改变类的属性，给类添加属性
 *
 * 1.装饰器-HelloDecorator
 *   -参数: class
 *   -返回值: class
 *
 * 2.思路
 *  -通过继承传入的class的构造函数，在内部进行属性和方法的添加修改
 *
 * 3.使用
 *  -通过@HelloDecorator进行使用
 *
 * 总结，通过class继承并返回新的class来实现属性和方法的添加修改等操作
 */

const HelloDecorator = <T extends new (...args: any[]) => any>(constructor: T) => {
  console.log('参数--->', constructor)
  return class extends constructor {
    newProperty = 'new property'

    hello = 'override'

    sayHello() {
      return this.hello
    }
  }
}

@HelloDecorator
export class Hello {
  // 处理未来要添加的属性
  [key: string]: any

  hello: string

  constructor() {
    this.hello = 'what ? hello'
  }
}

export const D2 = () => {
  // 注册一个 Hello装饰器
  const hello = new Hello()
  console.log(hello.sayHello())
}
