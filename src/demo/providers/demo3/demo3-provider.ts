import { Injectable } from '@nestjs/common'

@Injectable()
export class Demo3 {
  useClass() {
    return 'demo3 useClass'
  }

  useFactory() {
    return 'demo3 factory'
  }

  useAsync() {
    return 'demo3 async'
  }
}
