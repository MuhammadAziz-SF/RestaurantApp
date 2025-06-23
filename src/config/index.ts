import * as dotenv from 'dotenv';
dotenv.config();

export type ConfigType = {
  API_PORT: number;
  DB_URL: string;
  BASE_URL: string;
};

export const config: ConfigType = {
  API_PORT: parseInt(process.env.API_PORT as string, 10),
  DB_URL: String(process.env.DB_URL),
  BASE_URL: String(process.env.BASE_URL),
};
