
import json
import flask
from flask import Blueprint, Flask
import flask_login
from flask_login import login_required
from flask_oidc import OpenIDConnect

girros_auth = Blueprint('girros_auth',__name__)
oidc = OpenIDConnect()


@girros_auth.route('/login')
@oidc.require_login
def login():
    return redirect(url_for("blog.dashboard"))

@girros_auth.route('/logout')
def logout():
    oidc.logout()
    return 'Hi, you have been logged out! <a href="/">Return</a>'
