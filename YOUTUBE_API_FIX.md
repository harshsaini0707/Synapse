## YouTube API Key Configuration Fix

The error you're seeing indicates that your YouTube API key has HTTP referrer restrictions enabled in Google Cloud Console. Here's how to fix it:

### Option 1: Remove HTTP Referrer Restrictions (Recommended for Server-Side)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Navigate to **APIs & Services** > **Credentials**
3. Find your YouTube Data API v3 key
4. Click **Edit**
5. Under **Application restrictions**, either:
   - Select **None** (allows use from any source)
   - OR Select **IP addresses** and add your server IPs
6. Under **API restrictions**, make sure **YouTube Data API v3** is selected
7. Save the changes

### Option 2: Create a New Server-Side API Key

1. In Google Cloud Console, go to **APIs & Services** > **Credentials**
2. Click **+ CREATE CREDENTIALS** > **API key**
3. A new API key will be created
4. Click **Edit** on the new key
5. Under **Application restrictions**, select **None**
6. Under **API restrictions**, select **Restrict key** and choose **YouTube Data API v3**
7. Save and use this new key in your `.env` file

### Option 3: Use Service Account (Most Secure)

1. Create a Service Account in Google Cloud Console
2. Download the service account JSON file
3. Use it for authentication instead of API key

### Current Error Details:
- **Error**: `API_KEY_HTTP_REFERRER_BLOCKED`
- **Reason**: The API key is configured to only accept requests from specific domains
- **Solution**: Remove referrer restrictions or add your domain to the allowed list

The API key in your `.env` file appears to be valid, but it's restricted by referrer settings.