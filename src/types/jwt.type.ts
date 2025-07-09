export type JwtPayload = {
  sub: number;
  email: string;
  role: string;
  securityGroupId?: number | null;
  iat?: number;
  exp?: number;
};