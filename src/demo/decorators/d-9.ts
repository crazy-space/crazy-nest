import 'reflect-metadata'

class Point {
  x: number

  y: number
}

// class PointA {
//   x: number

//   y: number
// }

class Line {
  private _p0: Point

  private _p1: Point

  @validate
  // 这句可以省略,因为design:type是预定义属性
  // @Reflect.metadata('design:type', Point)
  set p0(value: Point) {
    this._p0 = value
  }

  get p0() {
    return this._p0
  }

  @validate
  // @Reflect.metadata("design:type", Point)
  set p1(value: Point) {
    this._p1 = value
  }

  get p1() {
    return this._p1
  }
}

function validate<T>(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<T>) {
  const { set } = descriptor
  descriptor.set = function (value: T) {
    const type = Reflect.getMetadata('design:type', target, propertyKey)
    console.log(type)
    if (!(value instanceof type)) {
      throw new TypeError('Invalid type.')
    }
    set.apply(this, [value])
  }
  return descriptor
}

export const D9 = () => {
  const line = new Line()
  const p0 = new Point()
  const p1 = new Point()
  p0.x = 1
  p0.y = 2
  p1.x = 3
  p1.y = 4
  line.p0 = p0
  line.p1 = p1
  console.log(line)
}

// 控制台输出: Line { _p1: Point { x: 1, y: 2 } }
