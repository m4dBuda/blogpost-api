export class TokenDTO {
  id: string;
  iat: number;
  exp: number;

  constructor(data: TokenDTO) {
    this.id = data.id!;
    this.iat = data.iat!;
    this.exp = data.exp!;
  }
}
