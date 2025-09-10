
# YouTube Video Downloader API

A serverless API to get YouTube video information and download videos in different qualities.

## Endpoints

### Get Video Information
```

GET /api/info?url={youtube_url}

```

### Download Video
```

GET /api/download?url={youtube_url}&quality={quality}

```

Available quality options: 1080p, 720p, 480p, 360p, 240p, 144p (default: 360p)

## Deployment

### Deploy to Vercel
1. Fork this repository
2. Connect your Vercel account to your GitHub
3. Import this repository to Vercel
4. Deploy!

### Deploy to Render
1. Fork this repository
2. Create a new Web Service on Render
3. Connect your repository
4. Set build command to `npm install` and start command to `npm start`
5. Deploy!

## Usage Example

Get video info:
```bash
curl "https://your-app.vercel.app/api/info?url=https://youtube.com/watch?v=60ItHLz5WEA"
```

Download video:

```bash
curl -o video.mp4 "https://your-app.vercel.app/api/download?url=https://youtube.com/watch?v=60ItHLz5WEA&quality=720p"
```

Note

This API is for educational purposes only. Please respect YouTube's terms of service.

```

## Deployment Instructions

### For Vercel:
1. Create a new repository with these files on GitHub
2. Go to [Vercel](https://vercel.com) and sign in
3. Click "New Project" and import your GitHub repository
4. Vercel will automatically detect the configuration and deploy your API

### For Render:
1. Create a new repository with these files on GitHub
2. Go to [Render](https://render.com) and sign in
3. Click "New +" and select "Web Service"
4. Connect your GitHub repository
5. Set the following:
   - Build Command: `npm install`
   - Start Command: `npm start`
6. Click "Create Web Service"

Your API will be available at:
- `https://your-app.vercel.app/api/info?url=YOUTUBE_URL` (for Vercel)
- `https://your-app.onrender.com/api/info?url=YOUTUBE_URL` (for Render)

The API endpoints will be:
- `/api/info` - Get video information
- `/api/download` - Download video in specified quality

This setup provides a clean, serverless API that can be easily deployed to either platform.
