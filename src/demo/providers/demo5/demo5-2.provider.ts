import { forwardRef, Inject, Injectable } from '@nestjs/common'

import { Demo51 } from './demo5-1.provider'

@Injectable()
export class Demo52 {
  constructor(@Inject(forwardRef(() => Demo51)) protected demo51: Demo51) {}

  demo52() {
    return `循环依赖 52`
  }
}
