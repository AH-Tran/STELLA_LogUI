from urllib import response
from flask import Flask, render_template, url_for, request
import requests, json
from forms import SearchForm
import collections
app = Flask(__name__)

app.config['SECRET_KEY'] = 'cof13dc122a324a46288d7055f02481d6be'
db_url = "http://localhost:8080"
rpp = 20 # Default Results per Page

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
        url_affix = "&rpp="
        query = request.form['query']
        rpp = request.form['rpp']
        if  "submit-box" in request.form:
            end_query = db_url + url + query + url_affix + rpp
        if  "submit-box-advanced" in request.form:
            radio_option = request.form['year-radio']
            if radio_option == "":
                end_query = db_url + url + query + url_affix + rpp
            else:
                end_query = db_url + url + query + " " + radio_option + url_affix + rpp  
        try:
            response = requests.get(end_query)
        except requests.ConnectionError:
            return "Connection Error" 
        #print(end_query)
        #response = response.text
        #search_results = json.loads(response)
        search_results = response.json()
        #print(search_results)
        if len(search_results["body"]) == 0:
             return render_template("no_result.html", title="No Results found", query= query)
    #print(search_results["body"]["1"]["docid"])
        #search_results_dict = json.loads(search_results)
        #return search_results
        return render_template("search.html", title="Search Results", search_results = search_results, query=query)
    else:
        return render_template("no_result.html", title="No Results found")

@app.route("/document")
def document():
    return render_template("document.html", title="Document")


if __name__ == '__main__':
    app.run(debug=True)