rm -rf .bin
mkdir .bin
mkdir .log
curl -o .bin/selenium-server https://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.2.jar
nohup java -jar .bin/selenium-server > selenium-server.log&
./node_modules/.bin/wdio wdio.conf.js
pkill -f selenium-server
