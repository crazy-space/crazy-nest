import { Module } from '@nestjs/common'

import { DemoController } from './demo.controller'

import { Demo1 } from './demo1/demo1-provider'
import { Demo2 } from './demo2/demo2-provider'
import { Demo3 } from './demo3/demo3-provider'
import { Demo4 } from './demo4/demo4-provider'
import { Demo51 } from './demo5/demo5-1.provider'
import { Demo52 } from './demo5/demo5-2.provider'

const demoTest = {
  useValue: () => 'useValue提供者',
  useAlias: () => '别名提供者',
}
const demo = new Demo1()

@Module({
  controllers: [DemoController],
  providers: [
    {
      provide: Demo1,
      useValue: demoTest,
    },
    {
      provide: 'Demo-Alias',
      useValue: demo,
    },
    {
      provide: Demo3,
      useClass: Demo2,
    },
    Demo2,
    Demo3,
    {
      provide: 'Demo4-Demo3',
      useFactory(demo3: Demo3) {
        console.log('demo4', demo3.useClass())
        const demo4 = new Demo4(demo3)
        return demo4
      },
      inject: [Demo3],
    },
    Demo51,
    Demo52,
  ],
})
export class DemoModule {}
