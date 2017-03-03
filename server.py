#!/usr/bin/env python

from flask import Flask
from flask import render_template
from base64 import b64encode
#

ogg = b64encode(open('example.ogg').read())

app = Flask(__name__)


@app.route('/')
def index():
	return render_template('page.html')


@app.route('/ogg')
def func():
	return ogg


app.run(debug=True)