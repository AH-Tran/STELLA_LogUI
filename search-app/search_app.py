from flask import Flask, render_template, url_for, request
import requests
from forms import SearchForm
app = Flask(__name__)

app.config['SECRET_KEY'] = 'cof13dc122a324a46288d7055f02481d6be'
db_url = "localhost:8080"

@app.context_processor
def base():
    form = SearchForm()
    return dict(form=form)

documents = [
    {
        "author": "John Talulah",
        "title": "Covid Doc 1",
        "abstract": "This document handles...",
        "date": "May 2, 2020"
    },
    {
        "author": "Jane Farum",
        "title": "Covid Doc 2",
        "abstract": "This document handles...",
        "date": "March 6, 2020"
    }

]

@app.route("/")
def home():
    form = SearchForm()
    return render_template("home.html", form=form)

@app.route("/about")
def about():
    return render_template("about.html", title="About")

@app.route("/result", methods=['GET', 'POST'])
def result():
    errors = []
    results = {}
    if request.method == "POST":
        url = "/stella/api/v1/ranking?query="
        url_affix = "&rpp=20"
        query = request.form['query']
        end_query = db_url + url + query + url_affix
        return end_query
        #return render_template("document.html", title="Document Results", documents = documents)
    else:
        return render_template("result.html", title="Search Results", documents = documents)

@app.route("/document")
def document():
    return render_template("document.html", title="Document")


if __name__ == '__main__':
    app.run(debug=True)