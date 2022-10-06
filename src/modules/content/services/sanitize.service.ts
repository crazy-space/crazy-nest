import { Injectable } from '@nestjs/common'
import { merge } from 'lodash'
import sanitizeHtml from 'sanitize-html'

// src/modules/content/services/sanitize.service.ts
@Injectable()
export class SanitizeService {
  protected config: sanitizeHtml.IOptions = {}

  constructor() {
    this.config = {
      allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img', 'code']),
      allowedAttributes: {
        ...sanitizeHtml.defaults.allowedAttributes,
        '*': ['class', 'style', 'height', 'width'],
      },
      parser: {
        lowerCaseTags: true,
      },
    }
  }

  sanitize(body: string, options?: sanitizeHtml.IOptions) {
    return sanitizeHtml(
      body,
      merge(this.config, options ?? {}, {
        arrayMerge: (_d: any, s: any, _o: any) => s,
      }),
    )
  }
}
