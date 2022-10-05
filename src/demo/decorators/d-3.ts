/**
 * 装饰器工厂
 *
 * 方便传递参数，将装饰器改造为装饰器工厂
 *
 * 1.第一层函数
 *  -参数: firstname, lastname
 *  -用来实现参数传递的
 * 2.返回一个新class
 * target就是需要处理的class
 *
 * 总结，装饰器接受一些参数来处理功能，可以将装饰器做成装饰器工厂的形式
 */

const SetNameDecorator = (firstname: string, lastname: string) => {
  const name = `${firstname}.${lastname}`
  return <T extends new (...args: any[]) => any>(target: T) => {
    return class extends target {
      _name: string = name

      getName() {
        return this._name
      }
    }
  }
}

@SetNameDecorator('you', 'zege')
class UserService {
  getName() {}
}

export const D3 = () => {
  const user = new UserService()
  console.log(user.getName())
}
