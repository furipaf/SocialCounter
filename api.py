app = Flask(__name__)

# Replace with your API keys and tokens
FACEBOOK_ACCESS_TOKEN = 'your_facebook_access_token'
INSTAGRAM_ACCESS_TOKEN = 'your_instagram_access_token'
YOUTUBE_API_KEY = 'your_youtube_api_key'

@app.route('/api/facebook')
def facebook_likes():
    page_id = 'your_page_id'
    url = f"https://graph.facebook.com/v12.0/{page_id}?fields=fan_count&access_token={FACEBOOK_ACCESS_TOKEN}"
    response = requests.get(url)
    return jsonify(response.json())

@app.route('/api/instagram')
def instagram_followers():
    user_id = 'your_user_id'
    url = f"https://graph.facebook.com/v12.0/{user_id}?fields=followers_count&access_token={INSTAGRAM_ACCESS_TOKEN}"
    response = requests.get(url)
    return jsonify(response.json())

@app.route('/api/youtube')
def youtube_subscribers():
    channel_id = 'your_channel_id'
    url = f"https://www.googleapis.com/youtube/v3/channels?part=statistics&id={channel_id}&key={YOUTUBE_API_KEY}"
    response = requests.get(url)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
