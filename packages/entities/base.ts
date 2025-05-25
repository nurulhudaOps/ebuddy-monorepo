export interface Meta {
  page: number;
  totalPage: number;
  totalData: number;
  totalDataOnPage: number;
}

export interface TokenData {
  userId: string;
  name: string;
  generatedAt: string;
  expiresAt: string;
}

export interface GenerateTokenData {
  userId: string;
  name: string;
  generatedAt: number;
}
