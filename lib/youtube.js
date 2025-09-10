const axios = require('axios');

const quality = {
  '1080p': 'Full HD (1080p)',
  '720p': 'HD (720p)',
  '480p': 'SD (480p)',
  '360p': 'Low (360p)',
  '240p': 'Very Low (240p)',
  '144p': 'Tiny (144p)'
};

async function getVideoInfo(url) {
  const { data } = await axios.post(`https://api.ytmp4.fit/api/video-info`, { url }, {
    headers: {
      'Content-Type': 'application/json',
      'Origin': 'https://ytmp4.fit',
      'Referer': 'https://ytmp4.fit/'
    }
  });

  if (!data || !data.title) throw new Error('Failed to fetch video info.');
  return data;
}

async function downloadVideo(url, quality) {
  const res = await axios.post(`https://api.ytmp4.fit/api/download`, { url, quality }, {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/octet-stream',
      'Origin': 'https://ytmp4.fit',
      'Referer': 'https://ytmp4.fit/',
    }
  });

  if (!res.headers['content-type'] || !res.headers['content-type'].includes('video')) {
    throw new Error('Failed to download video.');
  }

  const contentDisposition = res.headers['content-disposition'] || '';
  const filename = decodeURIComponent(
    contentDisposition.split("filename*=UTF-8''")[1] || `video_${quality}.mp4`
  ).replace(/[\/\\:*?"<>|]/g, '_');

  return {
    buffer: res.data,
    filename: filename,
    contentType: res.headers['content-type']
  };
}

module.exports = {
  getVideoInfo,
  downloadVideo,
  quality
};
