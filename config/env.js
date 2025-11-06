import dotenv from 'dotenv';
dotenv.config();

export const env = {
  port: process.env.PORT || 8000,
  mongoUri: process.env.MONGODB_URI,
  geminiKey: process.env.GEMINI_API_KEY,
  nodeEnv: process.env.NODE_ENV || 'development'
};
