import { UserEntity } from '../../user.entity';

export class UserCreatedDTO {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: UserEntity) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.avatar = data.avatar;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
}
