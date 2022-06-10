# Integration of Logging Frameworks into the STELLA Infrastructure
```
A Flask Search App integrated with STELLA and logged by LogUI and BigBrother
```
* Cord19 Search App available at: [http://localhost:5000/](http://localhost:5000/)
* Document Retrieval with STELLA and the [Cord19 Data Set](https://github.com/allenai/cord19)
* Automated Logging enabled with [LogUI](https://github.com/logui-framework) available at: [http://localhost:8000/](http://localhost:8000/)
* Alternative Logging enabled with [Big Brother](https://github.com/hscells/bigbro)  

## Cord19 Search App
![image info](./img/search_app.png)

## Table of contents
- [Prerequisites](#rerequisites)
- [How to use](#how-to-use)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
  - [Troubleshooting](#troubleshooting)
- [Further Research](#further-research)
- [Sources](#sources)
- [Acknowledgements](#acknowledgements)



## Prerequisites:  
* Python >= 3.6
* Java 11 or higher
* Docker
* Docker-compose
* Go

Tested under Ubuntu 20.04

## How to use
1. In order to fully utilize this repository, it is recommmended to set up the STELLA APP, Big Brother Server and the LogUI Server first before running the Flask Search Apps.  
2. Once they do, running the Flask Search App will automatically initiate either the LogUI or the Big Brother Client upon the first DOM model load. For this purpose, the repository offers two types of search apps: **search app** with LogUI client-side scripting and **search app** alternative for Big Brother's client-side scripting
3. Upon successful websocket connection with their respective servers, LogUI or Big Brother will commence actively logging key user interactions.

LogUI's custom event coding is defined in the [configuration object](https://github.com/AH-Tran/STELLA_LogUI/blob/main/search-app/static/logui_config.js), while Big Brother's configuration has been kept very default, making it log pretty much everything.
### Installation

For the basic flask requirements:
```
pip3 install -r requirements.txt
```

For setting up the STELLA APP, head [over here](https://stella-project.org/stella-documentation/guides/pyterrier/)

For setting up the LogUI server, consult its excellent documentation [over here](https://github.com/logui-framework/server)

For setting up the Big Brother server:
```
$ go install github.com/hscells/bigbro/cmd/bigbro
```

### Getting Started

Run STELLA:
```
docker-compose -f stella-app/yml/pyterrier.yml up -d
```
Run LogUI Server and LogUI Control App:
```
cd logui-server
docker-compose -p logui up
```

Run the respective flask via
```
cd search-app
python search-app.py
```
Access the Search app at [http://localhost:5000/](http://localhost:5000/) and start logging.

### Troubleshooting
Both STELLA and the LogUI Control App might want to occupy the same port :8000, forcing the user to reconsider either STELLA's docker-compose definition or LogUI's.

## Further Research
On further hinsight, it would be interesting to pursue additional interactive dashboarding tools to complement LogUI's and Big Brother's consistent logging features. With that, one could realistically create a live analytics dashboard, where new user interaction data is constantly fed into the dashboard, enabling researchers to observe and follow a user's journey in real time.

## Sources
[STELLA](https://stella-project.org/)  
[LogUI](https://github.com/logui-framework)  
[Big Brother](https://github.com/hscells/bigbro)  

## Acknowledgements
Many thanks to Timo Breuer and the Information Retrieval Research Group for developing and providing the STELLA Infrastructure for this thesis, with which it was possible to integrate logging frameworks in a readily available living lab environment.

Another thanks to David Maxwell for developing and providing the LogUI framework, but also the very detailed LogUI documentation, with which it became easier to integrate LogUI into the STELLA framework and troubleshoot problems in case of unforeseen errors.

And a final thanks to Harry Scells, Jimmy and Guido Zuccon for providing the Big Brother service, that I could use as a comparison with the LogUI framework when it comes to modern, contemporary logging solutions with a decidedly different focus.
