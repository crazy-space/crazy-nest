import { forwardRef, Inject, Injectable } from '@nestjs/common'

import { Demo52 } from './demo5-2.provider'

@Injectable()
export class Demo51 {
  constructor(@Inject(forwardRef(() => Demo52)) protected demo52: Demo52) {}

  demo51() {
    return `循环依赖 51 ${this.demo52.demo52()}`
  }
}
