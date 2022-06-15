# Integration of Logging Frameworks into the STELLA Infrastructure
```
A Flask Search App integrated with STELLA APP and logged by LogUI and BigBrother
```
* Cord19 Search App available at: [http://localhost:5000/](http://localhost:5000/)
* Document Retrieval with [STELLA](https://github.com/stella-project) and the [Cord19 Data Set](https://github.com/allenai/cord19)
* Automated Logging enabled with [LogUI](https://github.com/logui-framework) available at: [http://localhost:8000/](http://localhost:8000/)
* Alternative Logging enabled with [Big Brother](https://github.com/hscells/bigbro)  

## Cord19 Search App
![image info](./img/search_app.png)

## Video DEMOS
|[↓↓ LOGUI with STELLA DEMO ↓↓](https://www.youtube.com/watch?v=D47EbID5j14 "")|[↓↓ BIGBRO with STELLA DEMO ↓↓](https://www.youtube.com/watch?v=Zyt8CXORvpM "")|
| ----------- | ----------- |
|[![Watch the video](./img/logui_videothumbnail.jpg)](https://www.youtube.com/watch?v=D47EbID5j14)|[![Watch the video](https://i3.ytimg.com/vi/Zyt8CXORvpM/maxresdefault.jpg)](https://www.youtube.com/watch?v=Zyt8CXORvpM)|


## Table of contents
- [Video DEMOS](#video-demos)
- [Prerequisites](#prerequisites)
- [Repository structure](#repository-structure)
- [How to use](#how-to-use)
  - [Installation](#installation)
  - [Getting Started](#getting-started-with-logging)
  - [Troubleshooting](#troubleshooting)
- [Further Research](#further-research)
- [Sources](#sources)
- [Acknowledgements](#acknowledgements)



## Prerequisites
* Python >= 3.6
* Java >= 11
* Go / Golang >= 1.18.3
* Flask
* Docker
* Docker-compose

Recommended and tested under Ubuntu 20.04

## Repository structure
* `\logui-server`: Set-up folder for the LogUI framework
* `\stella-app`: Set-up folder for the STELLA APP
* `\search-app`: Flask implementation of the Cord19 Search App with LogUI integration 
* `\search-app-alternative`: Flask implementation of the Cord19 Search App with Big Brother integration 

## How to use
1. In order to fully utilize this repository, it is recommended to **set up and start** the `STELLA APP`, `Big Brother` server and the `LogUI` server first before running the Flask Search App.  
2. Once they do, running the Flask Search App will automatically initiate either the LogUI or the Big Brother Client upon the first full DOM model load. For this purpose, the repository offers two types of search apps:  
    -`search-app` with **LogUI client-side scripting** and `search-app-alternative` for **Big Brother's client-side scripting**
4. Upon successful websocket connection with their respective servers, LogUI or Big Brother will commence actively logging key user interactions according to their **custom event coding configuration**.

LogUI's custom event coding is defined in the [configuration object](https://github.com/AH-Tran/STELLA_LogUI/blob/main/search-app/static/logui_config.js), while Big Brother's configuration has been kept very default, making it log pretty much everything.
### Installation

For the basic Flask requirements:
```
pip install -r requirements.txt
```

For setting up the STELLA APP, refer to the documentation over here: [STELLA Pyterrier Doc](https://stella-project.org/stella-documentation/guides/pyterrier/)

For setting up LogUI, consult its excellent documentation:
[First Run Server Guide](https://github.com/logui-framework/server/wiki/First-Run-Guide) |
[First Run Client Guide](https://github.com/logui-framework/client/wiki/Quick-Start-Guide)

For setting up the Big Brother server, use this command to create a binary go-executable and refer to the BigBro's README for further info and extra tools such as inbuilt heat maps: [Big Bro README](https://github.com/hscells/bigbro)
```
go install github.com/hscells/bigbro/cmd/bigbro
```

### Getting started with Logging
1. Start from the repository's root-directory 

2. Run STELLA:
```
docker-compose -f stella-app/yml/pyterrier.yml up -d
```
3a. Start LogUI Server and LogUI Control App:
```
cd logui-server
```
```
docker-compose -p logui up
```
3b. Start Big Brother Server and enable Logging in CSV format
```
bigbro --filename bigbro_data.log csv
```
4. Run the respective Flask app in the folder `\search-app` or `\search-app-alternative`
```
python search_app.py
```
Access the Search app at [http://localhost:5000/](http://localhost:5000/) and start logging.

### Troubleshooting
1. Both the STELLA Dashboard and the LogUI Control App might want to occupy the same port localhost:8000 by default. Consider changing the port of either via STELLA's docker-compose file or LogUI's docker-compose file.   

2. When installing Go: Make sure that Go's installation directory AND Go's `$GOPATH` variable are added to your system's `$PATH` environment variable. Otherwise, bigbro commands might not be recognized. In Ubuntu 20.04, this is done by doing the following:  

Open the `bashrc` file:
```
sudo vi ~/bashrc
```
Add Go's installation directory and `$GOPATH` variable to the end of the `bashrc` file:
```
# SET GO PATH
export GOPATH="$HOME/go"
export PATH="$PATH:$GOPATH/bin:/usr/local/go/bin"
```

## Further Research
On further hindsight, it would be interesting to pursue additional interactive dashboarding tools to complement LogUI's and Big Brother's consistent logging features. With that, one could realistically create a live analytics dashboard, where new user interaction data is constantly fed into the dashboard, enabling researchers to observe and follow a user's journey in real time.

## Sources
[STELLA](https://stella-project.org/)  
[LogUI](https://github.com/logui-framework)  
[Big Brother](https://github.com/hscells/bigbro)  

## Acknowledgements
Many thanks to Timo Breuer and the Information Retrieval Research Group for developing and providing the STELLA Infrastructure for this thesis, with which it was possible to integrate logging frameworks in a readily available living lab environment.

Another thanks to David Maxwell for developing and providing the LogUI framework, but also the very detailed LogUI documentation, with which it became easier to integrate LogUI into the STELLA framework and troubleshoot problems in case of unforeseen errors.

And a final thanks to Harry Scells, Jimmy and Guido Zuccon for providing the Big Brother service, that I could use as a comparison with the LogUI framework when it comes to modern, contemporary logging solutions with a decidedly different focus.
