import dotenv from 'dotenv';
import path from 'path';

const rootDir = path.resolve(__dirname, '../..');
const mode = process.env.NODE_ENV;

const envFiles = [
  '.env',
  ...(mode ? [`.env.${mode}`] : []),
  '.env.local',
  ...(mode ? [`.env.${mode}.local`] : ['.env.development.local']),
];

for (const file of envFiles) {
  dotenv.config({ path: path.join(rootDir, file) });
}
