import config from "../config/config";
const { DB_USER, DB_PASSWORD, DB_NAME, DB_CLUSTER } = config;

export const MONGO_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

export const saveJson = (value: Object) => JSON.stringify(value);
export const readJson = (value: string) => JSON.parse(value);
