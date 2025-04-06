export enum TargetType {
  BlogPost = 'BlogPost',
  Comment = 'Comment',
}

export class ImageEntity {
  id: string;
  url: string;
  targetId: string;
  targetType: TargetType;
  createdAt: Date;
  updatedAt: Date;

  constructor({
    id,
    url,
    targetId,
    targetType,
    createdAt,
    updatedAt,
  }: {
    id: string;
    url: string;
    targetId: string;
    targetType: TargetType;
    createdAt: Date;
    updatedAt: Date;
  }) {
    this.id = id;
    this.url = url;
    this.targetId = targetId;
    this.targetType = targetType;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
