import { Controller, Get, Inject } from '@nestjs/common'

import { Demo1 } from './demo1/demo1-provider'
import { Demo3 } from './demo3/demo3-provider'
import { Demo4 } from './demo4/demo4-provider'
import { Demo51 } from './demo5/demo5-1.provider'

@Controller('demo-provider')
export class DemoController {
  constructor(
    private demo1: Demo1,
    @Inject('Demo-Alias') private demoAlias: Demo1,
    private demo3: Demo3,
    @Inject('Demo4-Demo3') private demo4Demo3: Demo4,
    private demo51: Demo51,
  ) {}

  @Get('demo1')
  async useValue() {
    return this.demo1.useValue()
  }

  @Get('demo-alias')
  async useValue1() {
    return this.demoAlias.useValue()
  }

  @Get('demo2-demo3')
  async useClass() {
    return this.demo3.useClass()
  }

  @Get('demo4-demo3')
  async useFactory() {
    console.log('demo4')
    return this.demo4Demo3.getContent()
  }

  @Get('demo51')
  async useDemo51() {
    return this.demo51.demo51()
  }
}
