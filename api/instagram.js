const fetch = require('node-fetch');

async function getInstagramData(accessToken, userId) {
    const url = `https://graph.instagram.com/v12.0/${userId}?fields=id,username,media_count&access_token=${accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

module.exports = { getInstagramData };