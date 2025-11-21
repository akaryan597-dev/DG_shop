import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

// ✅ Fix for __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ process.env types available via @types/node
const MONGO_URI: string = process.env.MONGODB_URI || "";

export const dbConfig = {
  uri: MONGO_URI,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  path: path.join(__dirname, "data"),
};
