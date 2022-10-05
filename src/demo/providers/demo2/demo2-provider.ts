import { Injectable } from '@nestjs/common'

@Injectable()
export class Demo2 {
  useClass() {
    return 'demo2---useClass'
  }
}
