export class UserEntity {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  avatar?: string | null;
  posts?: string[];
  likes?: string[];
  comments?: string[];

  constructor(
    id: string,
    name: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
    avatar?: string | null,
    posts?: string[],
    likes?: string[],
    comments?: string[],
  ) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.avatar = avatar;
    this.posts = posts;
    this.likes = likes;
    this.comments = comments;
  }
}
