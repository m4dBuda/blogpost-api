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

  constructor(data: ImageEntity) {
    this.id = data.id!;
    this.url = data.url!;
    this.targetId = data.targetId!;
    this.targetType = data.targetType!;
    this.createdAt = data.createdAt!;
    this.updatedAt = data.updatedAt!;
  }
}
