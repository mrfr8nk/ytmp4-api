const { downloadVideo } = require('../lib/youtube');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url, quality = '360p' } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'YouTube URL is required' });
  }

  try {
    const video = await downloadVideo(url, quality);
    
    res.setHeader('Content-Type', video.contentType);
    res.setHeader('Content-Disposition', `attachment; filename="${video.filename}"`);
    res.send(video.buffer);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};
