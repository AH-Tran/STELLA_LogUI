@app.route("/")
def home():
    uri = "https://api.stackexchange.com/2.0/users?   order=desc&sort=reputation&inname=fuchida&site=stackoverflow"
    try:
        uResponse = requests.get(uri)
    except requests.ConnectionError:
       return "Connection Error"  
    Jresponse = uResponse.text
    data = json.loads(Jresponse)

    displayName = data['items'][0]['display_name']# <-- The display name
    reputation = data['items'][0]['reputation']# <-- The reputation

    return Jresponse

___

 <form role="form" method='POST' action='/'>
        <div class="form-group">
          <input type="text" name="url" class="form-control" id="url-box" placeholder="Enter URL..." style="max-width: 300px;" autofocus required>
        </div>
        <button type="submit" class="btn btn-default">Submit</button>
      </form>


___
import os
import requests
from flask import Flask, render_template, request
from flask_sqlalchemy import SQLAlchemy

@app.route('/', methods=['GET', 'POST'])
def index():
    errors = []
    results = {}
    if request.method == "POST":
        # get url that the user has entered
        try:
            url = request.form['url']
            r = requests.get(url)
            print(r.text)
        except:
            errors.append(
                "Unable to get URL. Please make sure it's valid and try again."
            )
    return render_template('index.html', errors=errors, results=results)
______







{% extends "layout.html" %}
{% block content %}
    {% for document in search_results %}
        <article class="media content-section">
            <div class="media-body">
              <h2><a class="article-title" href="#">{{ document.title }}</a></h2>
              <p class="article-content"> An abstract is a brief summary of a research article, thesis, review, conference proceeding, or any in-depth analysis of a particular subject and is often used to help the reader quickly ascertain the paper's purpose.[1]</p>

              <!--- -->


              <div class="article-metadata" style="display: flex; justify-content: flex-end">
                <a class="mr-2" href="#">By John Talulah</a>
                <small class="text-muted"> 5. March 2020</small>
              </div>
            </div>
        </article>
    {% endfor %}
{% endblock  content%}

___

if no docker ps shows up:
$ sudo systemctl restart docker

commands for logui:
- cd logui-server
- ctrl+c quit terminal
- docker-compose -p logui down
- docker-compose -p logui up

commands for stella:
- cd to root(STELLA_LogUI)
- docker-compose -f stella-app/yml/pyterrier.yml down -d
docker-compose -f stella-app/yml/pyterrier.yml up -d

change websocket
8000 currently occupied by STELLA

ERROR
websocket-worker_1  | 2022-05-18 08:04:08,307 INFO     Starting server at tcp:port=8000:interface=0.0.0.0
websocket-worker_1  | 2022-05-18 08:04:08,308 INFO     HTTP/2 support not enabled (install the http2 and tls Twisted extras)
websocket-worker_1  | 2022-05-18 08:04:08,308 INFO     Configuring endpoint tcp:port=8000:interface=0.0.0.0
websocket-worker_1  | 2022-05-18 08:04:08,309 INFO     Listening on TCP address 0.0.0.0:8000
websocket-worker_1  | 2022-05-18 09:06:07,041 WARNING  Not Found: /ws/endpoint/
websocket-worker_1  | 172.19.0.4:59346 - - [18/May/2022:09:06:07] "GET /ws/endpoint/" 404 1049
___

using google dev tool
websocket is active, listening and connecting
mistake in client?