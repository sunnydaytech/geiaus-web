if [ ! -d ".bin" ]; then
  mkdir .bin
fi
if [ ! -d ".log" ]; then
  mkdir .log
fi
if [ ! -f .bin/selenium-server ]; then
  curl -o .bin/selenium-server https://selenium-release.storage.googleapis.com/2.42/selenium-server-standalone-2.42.2.jar
fi
nohup java -jar .bin/selenium-server > .log/selenium-server.log&

# starting the server
echo "node server.js"
nohup node server.js > .log/server.log&

./node_modules/.bin/wdio wdio.conf.js
pkill -f selenium-server
