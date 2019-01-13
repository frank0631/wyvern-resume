#!/usr/bin/env python3
import os
from flask import Flask
from flask_script import Server, Manager

from girros.app import create_app

manager = Manager(create_app)
server = Server(host='0.0.0.0', port=8080,threaded=True)
manager.add_command("runserver", server)

@manager.command
def test():
    from subprocess import call

    os.environ['FLASK_CONFIG'] = 'testing'
    call(['nosetests', '-v',
          '--with-coverage', '--cover-package=app', '--cover-branches',
          '--cover-erase', '--cover-html', '--cover-html-dir=cover'])

if __name__ == '__main__':
    manager.run()