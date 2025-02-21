import os
import json
import logging
from flask import Flask, jsonify, request, render_template
from socialcounters import SocialCounters

app = Flask(__name__,
            static_folder=os.path.join(os.path.expanduser('~'), 'social-counter/app/static'),
            template_folder=os.path.join(os.path.expanduser('~'), 'social-counter/app/templates'))

CONFIG_FILE = os.path.join(os.path.expanduser('~'), 'social-counter/app/config.json')
logger = logging.getLogger(__name__)

# Initialize SocialCounters with cache
sc = SocialCounters(cache_timeout=300)  # 5 minute cache

def get_config():
    """Load configuration from JSON file"""
    default_config = {
        "title": "Social Media Dashboard",
        "services": [],
        "order": []
    }
    
    try:
        with open(CONFIG_FILE, 'r') as f:
            config = json.load(f)
            # Merge with default config to ensure all keys exist
            return {**default_config, **config}
    except (FileNotFoundError, json.JSONDecodeError) as e:
        logger.warning(f"Using default config due to error: {str(e)}")
        return default_config

def save_config(config):
    """Save configuration to JSON file"""
    with open(CONFIG_FILE, 'w') as f:
        json.dump(config, f, indent=2)

@app.route('/')
def index():
    """Serve main interface"""
    return render_template('index.html')

@app.route('/api/counters')
def get_counters():
    """Fetch current counts for all configured services"""
    config = get_config()
    counters = []
    
    for service in config['services']:
        try:
            count = sc.get_count(
                platform=service['platform'],
                url=service['url'],
                access_token=service.get('access_token', '')
            )
            counters.append({
                'platform': service['platform'],
                'count': count,
                'label': service.get('label', service['platform'].capitalize()),
                'url': service['url']
            })
        except Exception as e:
            logger.error(f"Error fetching {service['platform']}: {str(e)}")
            counters.append({
                'platform': service['platform'],
                'count': 'N/A',
                'label': service.get('label', service['platform'].capitalize()),
                'url': service['url']
            })
    
    # Maintain saved order
    ordered_counters = sorted(counters, 
        key=lambda x: config['order'].index(x['platform']) if x['platform'] in config['order'] else len(config['order']))
    
    return jsonify({
        "title": config['title'],
        "counters": ordered_counters
    })

@app.route('/api/config', methods=['GET', 'POST'])
def handle_config():
    """Handle configuration updates"""
    if request.method == 'POST':
        try:
            new_config = request.json
            current_config = get_config()
            
            # Validate services structure
            valid_services = []
            for service in new_config.get('services', []):
                if all(key in service for key in ['platform', 'url']):
                    valid_services.append({
                        'platform': service['platform'],
                        'url': service['url'],
                        'label': service.get('label', ''),
                        'access_token': service.get('access_token', '')
                    })
            
            updated_config = {
                'title': new_config.get('title', current_config['title']),
                'services': valid_services,
                'order': new_config.get('order', current_config['order'])
            }
            
            save_config(updated_config)
            return jsonify({"status": "success"})
        
        except Exception as e:
            logger.error(f"Config update failed: {str(e)}")
            return jsonify({"status": "error", "message": str(e)}), 400
    
    return jsonify(get_config())

@app.route('/api/config/order', methods=['POST'])
def update_order():
    """Handle drag-and-drop reordering"""
    try:
        new_order = request.json.get('order', [])
        config = get_config()
        config['order'] = new_order
        save_config(config)
        return jsonify({"status": "success"})
    except Exception as e:
        logger.error(f"Order update failed: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 400

if __name__ == '__main__':
    # Setup logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Create default config if missing
    if not os.path.exists(CONFIG_FILE):
        save_config(get_config())
        logger.info("Created default config file")
    
    # Enable CORS if needed
    # from flask_cors import CORS
    # CORS(app)
    
    app.run(host='0.0.0.0', port=5000, threaded=True)
