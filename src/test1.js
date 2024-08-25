const publicIp = require('public-ip');

(async () => {
  try {
    const ipv4 = await publicIp.v4();
    console.log('Public IPv4 address:', ipv4);
  } catch (err) {
    console.error('Error getting public IP address:', err);
  }
})();