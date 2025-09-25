// api/fb-profile.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
  // Use your long-lived Facebook Access Token stored as an environment variable
  const ACCESS_TOKEN = process.env.FB_ACCESS_TOKEN;

  try {
    const response = await fetch(
      `https://graph.facebook.com/me/picture?type=large&redirect=false&access_token=${ACCESS_TOKEN}`
    );
    const data = await response.json();

    if (data && data.data && data.data.url) {
      res.status(200).json({ url: data.data.url });
    } else {
      res.status(500).json({ error: 'Could not fetch profile picture' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
}
