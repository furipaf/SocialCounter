const fetch = require('node-fetch');

async function getFacebookData(accessToken, pageId) {
    const url = `https://graph.facebook.com/v22.0/${pageId}?fields=fan_count,name,page_token,talking_about_count,were_here_count,id&access_token=${accessToken}`;
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

module.exports = { getFacebookData };