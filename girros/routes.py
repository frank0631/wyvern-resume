import json
import flask
from flask import Blueprint, Flask, render_template, g, jsonify
import flask_login
from flask_login import login_required
from flask_oidc import OpenIDConnect

from .auth import oidc

girros_general = Blueprint('girros_general',__name__)

@girros_general.route('/', defaults={'path': ''})
@girros_general.route('/<path:path>')
def homepage(path):
	if oidc.user_loggedin:
		user_info = oidc.user_getinfo(['preferred_username', 'sub', 'email'])
		return render_template('index.html', user_info=user_info )
	else:
		return 'Welcome anonymous, <a href="/private">Log in</a>'

@girros_general.route('/private')
@oidc.require_login
def hello_me():
    user_info = oidc.user_getinfo(['preferred_username', 'sub', 'email'])
    return ('Hello, %s  <p><a href="/">Return</a>' %
            (user_info))

@girros_general.route('/api')
@oidc.require_login
def hello_api():
	return json.dumps({"api":"true"})

@girros_general.route('/locations')
def locations():
    list = [
            {'a': 1, 'b': 2},
            {'a': 5, 'b': 10}
           ]
    return jsonify(results = list)
