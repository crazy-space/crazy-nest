import { Injectable } from '@nestjs/common'

@Injectable()
export class Demo1 {
  useValue() {
    return 'value--'
  }

  useString() {
    return '字符串---'
  }

  useAlias() {
    return '别名---'
  }
}
