sudo apt-get install docker-ce=<5:20.10.16~3-0~ubuntu-focal> docker-ce-cli=<5:20.10.16~3-0~ubuntu-focal> containerd.io docker-compose-plugin
sudo apt-get install ./docker-desktop-4.8.1-amd64.deb

cd to workspace
$ sudo docker-compose -f stella-app/yml/pyterrier.yml up -d

cd to logui-server
docker compose

cd to stella-app
docker compose

cd to search-app
python search-app.py
