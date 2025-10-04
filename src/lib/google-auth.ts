import { GoogleAuth } from 'google-auth-library';

export function getGoogleAuth() {
  try {
    // For production: use environment variable
    if (process.env.NODE_ENV === 'production' && process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON) {
      const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON);
      return new GoogleAuth({
        credentials,
        scopes: ['https://www.googleapis.com/auth/youtube.readonly']
      });
    }
    
    // For development: use local file
    if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
      return new GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/youtube.readonly']
      });
    }
    
    throw new Error('Google credentials not configured');
  } catch (error) {
    console.error('Google Auth setup error:', error);
    throw error;
  }
}