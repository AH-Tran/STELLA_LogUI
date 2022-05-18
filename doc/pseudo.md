# Web App

## Does your program have a user interface? What will it look like? What functionality will the interface have? Sketch this out on paper.
- Search Webpage
- Textfield with Userinput for queries
## What inputs will your program have? Will the user enter data or will you get input from somewhere else?
- Userqueries like coronavirus + origin
## What’s the desired output?
- A new result page with relevant results, received from a JSON file
## Given your inputs, what are the steps necessary to return the desired output?
- send the query to pyterrier
- receive json results file from pyterrier
- display json results in web result page

## Pseudo code
- When user inputs query in textfield
- | send query to pyterrier search engine
- | receive results as JSON file
- | | sort results by number/place
- | | display JSON file as results page
- | | | external link: author name?
- | | | add tags?
- | | display recommendation on sidepane


## Logui Steps
- (Install Server)
- change proxy port in .env file to 8052
- Install Client
- insert javascript into layout.html?
- configure logui
- simulate and retrieve log data
- visualize?