from flask import Flask, render_template, url_for
from forms import SearchForm
app = Flask(__name__)

app.config['SECRET_KEY'] = 'cof13dc122a324a46288d7055f02481d6be'

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
    return render_template("result.html", title="Search Results", documents = documents)

@app.route("/document")
def document():
    return render_template("document.html", title="Document")


if __name__ == '__main__':
    app.run(debug=True)