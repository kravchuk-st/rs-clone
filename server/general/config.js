import vars from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

vars.config({
  path: path.join(__dirname, '../vars.env'),
});

const PORT = 3000;
const MongoConnect = process.env.CONNECTION_QUERY;

export { PORT, MongoConnect };
