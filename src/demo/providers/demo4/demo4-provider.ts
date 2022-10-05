import { Demo3 } from '../demo3/demo3-provider'

export class Demo4 {
  constructor(private demo3: Demo3) {}

  getContent() {
    return this.demo3.useFactory()
  }

  async getPromise() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(this.demo3)
      }, 100)
    })
  }
}
