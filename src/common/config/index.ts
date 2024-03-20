import * as dotenv from 'dotenv';

dotenv.config();

export interface IConfig {
  serverPort: number;
  jwtSecretKey: string;
  jwtExpiredIn: string;
  databaseUrl: string;
}


export const Config: IConfig = {
  serverPort: Number(process.env.PORT),
  jwtSecretKey: process.env.JWT_SECRET_KEY,
  jwtExpiredIn: process.env.JWT_EXPIRED_IN,
  databaseUrl: process.env.DB_URL,
};
