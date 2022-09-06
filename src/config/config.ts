import dotenv from "dotenv";
dotenv.config();
const { DB_USER, DB_PASSWORD, DB_NAME, DB_CLUSTER } = process.env;

if (!DB_USER || !DB_PASSWORD || !DB_NAME || !DB_CLUSTER) {
  throw new Error("Missing environment variables");
}

interface IConfig {
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
  DB_CLUSTER: string;
}

const config: IConfig = {
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_CLUSTER,
};

export default config;
