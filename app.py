from flask import Flask, jsonify, request, render_template
import json
import time
from socialcounters import SocialCounters

app = Flask(__name__, 
    static_folder=os.path.join(os.path.expanduser('~'), 'social-counter/app/static'),
    template_folder=os.path.join(os.path.expanduser('~'), 'social-counter/app/templates'))

# ... [Previous backend code from earlier response] ...

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
