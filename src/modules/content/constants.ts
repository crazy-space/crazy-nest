// 文章排序类型
export enum PostOrderType {
  CREATED = 'createdAt',
  UPDATED = 'updatedAt',
  PUBLISHED = 'publishedAt',
  COMMENTCOUNT = 'commentCount',
  CUSTOM = 'custom',
}
// 文章内容类型
export enum PostBodyType {
  HTML = 'html',
  MD = 'markdown',
}
