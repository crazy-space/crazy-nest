import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common'

// optional.uuid.pipe.ts
export class OptionalUUIDPipe extends ParseUUIDPipe {
  async transform(value?: string, metadata?: ArgumentMetadata) {
    if (value === undefined) return value
    return super.transform(value, metadata)
  }
}
